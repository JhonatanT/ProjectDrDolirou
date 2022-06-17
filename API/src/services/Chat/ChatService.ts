import { deleteModel, disconnect } from "mongoose";
import { mongodb } from "../../connection";
import { Mongo_friend_chat } from "../../model/Mongo_friend_chat";


interface data_chat{
    participants?: string[]
    AddnewChat?: object[]
    id_chat?:string
}

const mong = new Mongo_friend_chat();

class ChatService{
    
    async Addchat({participants}:data_chat){

        await mongodb()
        const con_mong = mong.Friend_Chat();
        const addChat = await con_mong.friendChat.create({
            data:{
                participants,
                chat: []
            }
        }).catch(e => {throw new Error(e)})

        disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_chat')

        return addChat.data.id

    }

    async FindChat(id_chat:string){

        await mongodb()
        const con_mong = mong.Friend_Chat();

        console.log(id_chat);
        
        const findChat = await con_mong.friendChat.findOne({
                'data.id': id_chat, 
        }).catch(e => {throw new Error(e)})

        disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_chat')

        return findChat.data.chat

    }

    async AddnewChat({AddnewChat, id_chat}:data_chat){

        await mongodb()
        const con_mong = mong.Friend_Chat();

        const find_insert_chat = await con_mong.friendChat.findOneAndUpdate({'data.id': id_chat}
        ,{
            'data.chat': AddnewChat, 
        },
        {
            overwrite:false, 
            upsert:true, 
            rawResult:true,
            returnOriginal:false
        }).catch(e => {throw new Error(e)})

        disconnect().then(() => console.log('disconnect mongo'))
        deleteModel('friend_chat')

        return find_insert_chat.value.data.chat
    }
}
export {ChatService}