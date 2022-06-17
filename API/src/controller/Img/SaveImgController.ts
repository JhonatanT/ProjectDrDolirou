import {Request, Response} from 'express'
import multer from 'multer'
import fs1 from 'fs-extra'
import fs from 'fs'

interface dataUser{
    id:string
}

class SaveImgController{

    async handle(request:Request, response:Response){

        const {id} = request.user_id as dataUser

        const path = `./imgs/${id}`;
        
        fs.access(path, (error) => {
            if (error) {
                return response.status(400).send('Directory not exists')
            } 
            else {

                const storage = multer.diskStorage({
                    destination: function (request, file, cb) {
                        cb(null, `./imgs/${id}/`);
                    },
                    filename: function (request, file, cb) {
                        cb(null, file.filename = id +'.'+ file.originalname.split('.')[1]);
                    },
                })
            
                const parser = multer({storage})
            
                parser.single('file')(request, response, async err => {
                    if (err||!request.file)
                        return response.status(500).json({ error: 1, payload: err });
                    else{
                        return response.status(200).send('Created Image')
                    }
                });
            }
        });
    }
}
export {SaveImgController}