import {Request, Response} from 'express'
import { AddfinancialService } from '../../services/Financial/AddfinancialService'

interface dataUser{
    id:string
}

class AddfinancialController{
    async handle(request: Request, response:Response){

        const { title, type, type_expenses, amount} = request.body

        const {id} = request.user_id as dataUser

        const addfinancialService = new AddfinancialService()

        const addFinancial = await addfinancialService.execute({id_user:id, title, type, type_expenses, amount})

        return response.status(201).send(addFinancial)
    }
}
export {AddfinancialController}