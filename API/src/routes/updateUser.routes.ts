import { Router} from "express";
import { UpdateuserController } from "../controller/User/UpdateuserController";

const updateUser = Router();

const updateuserController = new UpdateuserController();

updateUser.post("/", updateuserController.handle)

export {updateUser};