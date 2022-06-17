import { deleteModel, disconnect } from "mongoose"
import { mongodb } from "./connection"
import { Mongo_friend_chat } from "./model/Mongo_friend_chat"
import {io} from "./server"
import { ChatService } from "./services/Chat/ChatService"

interface RoomUser{
    socket_id:string
    id_chat:string
    for_:string
}

const users:RoomUser[]=[]

const chatService = new ChatService()

io.on("connection", (socket) => {
    
    socket.on("id_chat_for_", async (data, callback) => {

        socket.join(data.id_chat)

        const userInRoom = users.find(user => user.for_ === data.for_ && user.id_chat === data.id_chat)

        if(userInRoom){
            userInRoom.socket_id = socket.id
        }
        else{
            users.push({
                id_chat: data.id_chat,
                for_: data.for_,
                socket_id: socket.id
            })
        }
        
        const Messagem_friend = await getMessagesIdFriend(data.id_chat)
        callback(Messagem_friend)
    })

    socket.on("message", async (data) => {

        const findChat = await chatService.FindChat(data.id_chat)

        findChat.push({ 
            for_: data.for_, 
            message: data.message, 
            createdAt: new Date()
         })

        await chatService.AddnewChat({AddnewChat: findChat, id_chat: data.id_chat})

        io.to(data.id_chat).emit("message", {
            for_: data.for_, 
            message: data.message, 
            createdAt: new Date()
         })

    })

})

async function getMessagesIdFriend(id_user:string){
    const Messages_friend = await chatService.FindChat(id_user)
    return Messages_friend
}
