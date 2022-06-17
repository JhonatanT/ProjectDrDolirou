import { compare } from "bcryptjs"
import { decode, sign } from "jsonwebtoken"
import { prisma } from '../../connection/index'

interface data_user{
    email:string
    pass:string
}

class AuthenticUserService{
    async execute({email, pass}:data_user){

        const  emailExist = await prisma.tb_users.findFirst({
            where:{
                email
            }
        })

        if(!emailExist){
            throw new Error("Email/Password is Incorrect");
        }

        const pass_compare = await compare(pass, emailExist.pass)

        if(!pass_compare){
            throw new Error("Email/Password is Incorrect");
        }

        const token = sign({
            id: emailExist.id,
            id_avatar: emailExist.id_picture_mongo
        },"c094a4ad8a548c26dd6957247edde900",{
            expiresIn:"1d"
        })
        
        return token

    }
}
export {AuthenticUserService}