import fs1 from 'fs-extra'
import fs from 'fs'

class Remove_createdpaste{


    async remove_paste(id_user:string){

        const path = `./imgs/${id_user}`;
  
        fs1.remove(path, (error) => {
            if (error) {
                return error
            } 
            else {
                return 1
            }
        });
    }

    async create_paste(id_user:string){

        const path = `./imgs/${id_user}`;
  
        fs.access(path, (error) => {
        
        if (error) {
            fs.mkdir(path, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("New Directory created successfully !!");
            }
            });
        } else {
            console.log("Given Directory already exists !!");
        }
        });
        
    }
}
export {Remove_createdpaste}