import { Router} from "express";
import { AdduserController } from "../controller/User/AdduserController";

const addUser = Router();

const adduserController = new AdduserController();

addUser.post("/", adduserController.handle)

export {addUser};