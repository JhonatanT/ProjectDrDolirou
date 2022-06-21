import { disconnect, deleteModel } from "mongoose";
import { mongodb } from "../../connection";
import { Mongo_friend_list } from "../../model/Mongo_friend_list";
import { Validate_FriendList } from "../Validate_Data/Chat/Validate_FriendList";

interface data_send_inv{
    to_:string, 
    for_:string
    result?:boolean
}

const validate_FriendList = new Validate_FriendList()

class AddFriendListService{

    async send_invitation_friend({to_, for_}:data_send_inv){

        await validate_FriendList.Validate_Find_AddReject_friend({to_, for_})

        const find_friendidExists = await validate_FriendList.Validate_Find_Search_friend({to_, for_})

        if(find_friendidExists.exist){
            throw Error("Invite Exist")
        }
        
        await mongodb()
        const mong = new Mongo_friend_list();
        const con_mong = mong.Friend_List()

        const addInvint = await con_mong.friendList.findOneAndUpdate({'data.user_id': to_},
        {
            'data.request_friend':find_friendidExists.friends
        }
        ,{
            overwrite:false, 
            upsert:true, 
            rawResult:true
        })

        disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_list')
        
        return {invited: addInvint.ok.toString()}
    }

    async accept_reject({to_, for_, result}:data_send_inv){

        const find_InvitefriendExist = await validate_FriendList.Validate_Find_Search_friend({to_, for_})

        if(!find_InvitefriendExist.exist){
            throw Error("Id not invited in list")
        }

        const friend_filter = find_InvitefriendExist.friends.filter(friendId => friendId !== for_)


        if(!result){

            await mongodb()
            const mong = new Mongo_friend_list();
            const con_mong = mong.Friend_List()

            const rjct = await con_mong.friendList.findOneAndUpdate({'data.user_id': to_}
            ,{
                'data.request_friend': friend_filter
            },
            {
                overwrite:false, 
                upsert:true, 
                rawResult:true
            })

            disconnect().then(() => console.log('disconnect mongo'))
            deleteModel('friend_list')

            return {rejected: rjct.ok}
        }

        const find_friend = await validate_FriendList.Validate_Find_AddReject_friend({to_, for_})

        await mongodb()
        const mong = new Mongo_friend_list();
        const con_mong = mong.Friend_List()
        const acc_to = await con_mong.friendList.findOneAndUpdate({'data.user_id': to_}
        ,{
            'data.list_friend': find_friend.friendsAccRjct_to, 
            'data.request_friend': friend_filter
        },
        {
            overwrite:false, 
            upsert:true, 
            rawResult:true
        })
        
        const acc_for = await con_mong.friendList.findOneAndUpdate({'data.user_id': for_}
        ,{
            'data.list_friend': find_friend.friendsAccRjct_for, 
        },
        {
            overwrite:false, 
            upsert:true, 
            rawResult:true
        })
        
        disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_list')

        return {to_:acc_to.ok,for_:acc_for.ok}

    }
}
export {AddFriendListService}