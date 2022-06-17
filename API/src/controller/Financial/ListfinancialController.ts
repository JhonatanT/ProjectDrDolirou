import { Request, Response } from "express";
import { ListfinancialService } from "../../services/Financial/ListfinancialService";

interface dataUser{
    id:string
}

class ListfinancialController{

    async handle(request:Request, response:Response){

        const listfinancialService = new ListfinancialService()

        const {id} = request.user_id as dataUser

        const ListAllFinancial = await listfinancialService.execute(id);

        return response.status(200).send(ListAllFinancial)

    }

}
export {ListfinancialController}