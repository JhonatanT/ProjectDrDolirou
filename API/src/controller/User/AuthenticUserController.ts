import {Request, Response} from 'express'
import { AuthenticUserService } from '../../services/User/AuthenticUserService'


class AuthenticUserController{

    async handle(request:Request, response:Response){

        const {email, pass} = request.body

        const authenticUserService = new AuthenticUserService()

        const authentic = await authenticUserService.execute({email, pass})

        return response.status(200).send(authentic)

    }

}
export {AuthenticUserController}