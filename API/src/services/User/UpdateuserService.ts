import { prisma } from "../../connection"
import { Validate_User } from "../Validate_Data/User/Validate_User"

interface data_user{
    id_user:string
    name:string
    email:string
}

const validate_User = new Validate_User()

class UpdateuserService{

    async execute({id_user, name, email}:data_user){

        const idExist = await validate_User.Validate_Exist_id_user({id:id_user})

        if(!idExist){
            throw new Error('id not Exist')
        }

        const update = await prisma.tb_users.update({
            where:{
                id:id_user
            },
            data:{
                name,
                email
            }
        }).catch( (e) => {throw new Error(e)})


        return {user:update.id, "Update":1}


    }

}
export {UpdateuserService}