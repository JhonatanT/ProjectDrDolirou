import {Request, Response} from 'express'
import multer from 'multer'
import { UpdateuserService } from '../../services/User/UpdateuserService'


interface dataUser{
    id:string
}

class UpdateuserController{

    async handle(request:Request, response:Response){

        const {id} = request.user_id as dataUser

        const {name, email} = request.body

        const updateuserService =  new UpdateuserService()
        
        const updateUser = await updateuserService.execute({id_user: id, name, email})

        return response.status(200).send(updateUser)

    }

}
export {UpdateuserController}