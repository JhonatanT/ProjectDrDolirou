import { Router} from "express";
import { FindimgUserController } from "../controller/User/FindimgUserController";

const findIMG = Router();

const findimgUserController = new FindimgUserController();

findIMG.get("/", findimgUserController.handle)

export {findIMG};