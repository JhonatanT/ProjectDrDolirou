import { prisma } from '../../connection/index'

class ListfinancialService{

    async execute(id_user:string){
        const ListAllFinancial = await prisma.tb_financial.findMany({
            where:{
                id_user
            }
        })
        return ListAllFinancial
    }

}

export {ListfinancialService}