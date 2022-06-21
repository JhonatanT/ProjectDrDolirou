import fs from 'fs/promises';

class FindimgUserService{
    async execute(id:string){
        const data = await fs.readFile(`./imgs/${id}/${id}.png`)
        return data
    }
}
export {FindimgUserService}