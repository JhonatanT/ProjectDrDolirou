import { prisma, mongodb } from '../../connection/index'
import { hash } from "bcryptjs"
import { Validate_User } from '../Validate_Data/User/Validate_User'

import { disconnect, deleteModel } from "mongoose";
import { Mongo_friend_list } from "../../model/Mongo_friend_list";
import { Remove_createdpaste } from '../Validate_Data/IMGs/Remove_createdpaste';



interface data_user{
    name:string
    email:string
    pass:string
    id_picture_mongo:string
}

const validate_User = new Validate_User()

class AdduserService {
    async execute({ name, email, id_picture_mongo, pass }:data_user){

        let create_friend_list;
        await mongodb()

        const userExist = await validate_User.Validate_Exist_User({name, email, id_picture_mongo, pass})

        if(userExist){
            const PassHash = await hash(pass, 8);

            const addUser = prisma.tb_users.create({
                data:{
                    name,
                    email,
                    pass: PassHash,
                    id_picture_mongo
                }
            }).then( async (data) => {
                const mong = new Mongo_friend_list()
                const con_mong = mong.Friend_List()

                await con_mong.friendList.create({

                    data:{
                        user_id: data.id,
                        list_friend: [{}],
                        request_friend: [""]
                    }

                }).then(async (info) => {

                    const remove_createdpaste = new Remove_createdpaste()
                    await remove_createdpaste.create_paste(data.id).catch((e) => {throw new Error(e)})
                    
                    create_friend_list = info.data.id

                }).catch((e) => {

                    throw new Error(e)

                })

                disconnect().then(() => console.log('disconnect mongo'))
                deleteModel('friend_list')

            }).catch((err) => {
                console.log(err);
            })

            return "User created successfully"
        }
        
    }
}

export {AdduserService}