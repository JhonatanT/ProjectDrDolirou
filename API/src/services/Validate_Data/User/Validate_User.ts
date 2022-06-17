import { prisma } from '../../../connection/index'

interface data_user{
    id?:string
    name?:string
    email?:string
    pass?:string
    id_picture_mongo?:string
}

class Validate_User{

    async Validate_Exist_User({name, email, pass, id_picture_mongo}:data_user){

        if(name?.trim() == '' || email?.trim() == '' || pass?.trim() == '' || id_picture_mongo?.trim() == ''){
            throw new Error("some empty fields");
        }

        const userExists = await prisma.tb_users.findFirst({
            where:{
                OR:[{name},{email}]
            }
        })

        if(userExists?.id){
            throw new Error("User already exists");
        }

        return '1'
        
    }

    async Validate_Exist_id_user({id}:data_user){

        if(id?.trim() == '' || id?.trim() === undefined ){
            throw new Error("some empty fields");
        }
        
        const idExist = await prisma.tb_users.findFirst({
            where:{
                id
            }
        })
        
        if(!idExist){
            throw new Error("id not exist")
        }

        return idExist != null ? true : false
    }

}
export {Validate_User}