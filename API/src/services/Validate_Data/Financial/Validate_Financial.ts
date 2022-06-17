
interface data_financial{
    title:string
    type:boolean
    type_expenses:string
    amount:number
}


class Validate_Financial{
    async Validate_data_financial({title, type, type_expenses, amount}:data_financial){

        if(title.trim() == '' || type_expenses.trim() == '' || typeof type != 'boolean' || typeof amount != 'number' || undefined){
            throw new Error("some empty fields");
        }

        return true
    }
}
export {Validate_Financial}