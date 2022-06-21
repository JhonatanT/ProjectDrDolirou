import {Request, Response} from 'express'
import { FindimgUserService } from '../../services/User/FindimgUserService'

interface data_id{
    id:string
}
class FindimgUserController{

    async handle(request:Request, response:Response){

        const { id } = request.user_id as data_id

        const findimgUserService = new FindimgUserService()

        const findIMG = await findimgUserService.execute(id)

        return response.end(findIMG)

    }

}
export {FindimgUserController}