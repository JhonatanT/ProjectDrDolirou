import mongoose from 'mongoose'
import {v4} from 'uuid'

class Mongo_friend_chat{

    Friend_Chat(){

        const friend_chat = new mongoose.Schema({
            data:{
                id: {type: String, required:true, default:v4()},
                participants: {type: Array, required:true},
                chat: {type: Array, required:true}
            }
        })

        const friendChat = mongoose.model('friend_chat', friend_chat)

        return { friendChat }

    }

}

export {Mongo_friend_chat}