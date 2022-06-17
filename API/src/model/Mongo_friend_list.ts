import mongoose from 'mongoose'
import {v4} from 'uuid'

class Mongo_friend_list{

    Friend_List(){

        const friend_list = new mongoose.Schema({
            data:{
                id: {type: String, required:true, default:v4()},
                user_id: {type: String, required:true},
                list_friend: {type: Array, required:true},
                request_friend: {type: Array, required:true}
            }
        })

        const friendList = mongoose.model('friend_list', friend_list)

        return { friendList }

    }

}

export {Mongo_friend_list}