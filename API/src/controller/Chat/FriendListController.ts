import {Request, Response} from 'express'
import { AddFriendListService } from '../../services/Chat/FriendListService'

class FriendListController{

    async handle_send_invitation_friend(request:Request, response:Response){

        const {to_, for_} = request.body

        const addFriendListService = new AddFriendListService()

        const send_Inveit = await addFriendListService.send_invitation_friend({to_, for_})

        return response.status(201).send(send_Inveit)

    }

    async handle_accept_reject(request:Request, response:Response){

        const {to_, for_, result} = request.body

        const addFriendListService = new AddFriendListService()

        const accept_reject = await addFriendListService.accept_reject({to_, for_, result})

        return response.status(201).send(accept_reject)

    }
}
export {FriendListController}