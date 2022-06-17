import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

export function ensureAuthenticated(request:Request, response:Response, next:NextFunction){

    const authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).json({message: "unauthorized token"})
    }

    const [, token] = authToken.split(" ")

    try{
        request.user_id = verify(token , 'c094a4ad8a548c26dd6957247edde900')

        return next()
    }
    catch(e){
        return response.status(401).json({message: "unauthorized token"})
    }
}