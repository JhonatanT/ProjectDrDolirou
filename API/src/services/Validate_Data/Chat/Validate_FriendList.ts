import { deleteModel, disconnect } from 'mongoose'
import { mongodb } from '../../../connection/index'
import { Mongo_friend_list } from '../../../model/Mongo_friend_list'
import { ChatService } from '../../Chat/ChatService'
import { Validate_User } from '../User/Validate_User'

interface data_send_inv{
    to_:string, 
    for_:string
}
interface friends_actrjct{
    id_user_FK:string
    id_chat:string
}

let friendsAccRjct_to:friends_actrjct[]=[]
let friendsAccRjct_for:friends_actrjct[]=[]
const validate_User = new Validate_User()

class Validate_FriendList{

    async Validate_Find_Search_friend({to_, for_}:data_send_inv){
        
        await validate_User.Validate_Exist_id_user({id:for_})

        let friends=[]
        await mongodb()
        const mong = new Mongo_friend_list();
        const con_mong = mong.Friend_List()
        
        const findUser = await con_mong.friendList.find({'data.user_id': to_})

        await disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_list')

        for(let i=0; i < findUser[0].data.request_friend.length; i++){
            friends.push(findUser[0].data.request_friend[i]);
        }

        const find_friendidExist = friends.find(friendId => friendId === for_)

        friends.push(for_)

        return {exist:find_friendidExist, friends}
        
    }

    async Validate_Find_AddReject_friend({to_, for_}:data_send_inv){

        await validate_User.Validate_Exist_id_user({id:for_})

        friendsAccRjct_to = []
        friendsAccRjct_for = []
        const chatService = new ChatService()
        let participants = []
        
        await mongodb()
        const mong = new Mongo_friend_list();
        const con_mong = mong.Friend_List()

        const findUser_to = await con_mong.friendList.find({'data.user_id': to_})
        
       
        const findUser_for = await con_mong.friendList.find({'data.user_id': for_})
        
        await disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_list')

        for(let i=0; i < findUser_for[0].data.list_friend.length; i++){
            friendsAccRjct_for.push(findUser_for[0].data.list_friend[i]);
        }

        for(let i=0; i < findUser_to[0].data.list_friend.length; i++){
            friendsAccRjct_to.push(findUser_to[0].data.list_friend[i]);
        }
        
        const find_friendidExist = friendsAccRjct_to.find(friend => friend.id_user_FK === for_)

        if(find_friendidExist){
            throw Error("friend Exist")
        }

        participants.push(for_,to_)

        const id_chat = await chatService.Addchat({participants}).catch((e) => {throw Error(e)})

        friendsAccRjct_to.push({
            id_user_FK:for_,
            id_chat
        })
        
        friendsAccRjct_for.push({
            id_user_FK:to_,
            id_chat
        })

        return {exist:find_friendidExist, friendsAccRjct_to, friendsAccRjct_for}
        
    }

}
export {Validate_FriendList}