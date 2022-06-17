import { prisma } from '../../connection/index'
import { Validate_Financial } from "../Validate_Data/Financial/Validate_Financial"
import { Validate_User } from "../Validate_Data/User/Validate_User"


interface data_financial{
    id_user:string
    title:string
    type:boolean
    type_expenses:string
    amount:number
}

const  validate_User =  new Validate_User();
const  validate_Financial =  new Validate_Financial();

class AddfinancialService{
    async execute({id_user, title, type, type_expenses, amount}:data_financial){

        await validate_User.Validate_Exist_id_user({id:id_user})
        await validate_Financial.Validate_data_financial({title, type, type_expenses, amount})

        const addFinancial = await prisma.tb_financial.create({
            data:{
                title,
                id_user,
                amout:amount,
                type,
                type_expenses
            }
        }).catch((e) => {
            throw new Error(e)
        })

        return addFinancial
    }
}

export {AddfinancialService}