import {Request, Response} from 'express'
import { AdduserService } from '../../services/User/AdduserService'


class AdduserController{
    async handle(request: Request, response: Response){
        
        const { name, email, id_picture_mongo, pass } = request.body

        const adduserService =  new AdduserService();

        const AddUser = await adduserService.execute({name, email, id_picture_mongo, pass})

        return response.status(201).send(AddUser)

    }
}

export {AdduserController}