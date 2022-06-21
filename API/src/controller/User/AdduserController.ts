import {Request, Response} from 'express'
import { AdduserService } from '../../services/User/AdduserService'


class AdduserController{
    async handle(request: Request, response: Response){
        
        const { name, email, pass } = request.body

        const adduserService =  new AdduserService();

        const AddUser = await adduserService.execute({name, email, pass})

        return response.status(201).send(AddUser)

    }
}

export {AdduserController}