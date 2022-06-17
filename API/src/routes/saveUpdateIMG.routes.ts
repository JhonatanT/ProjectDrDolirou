import { Router} from "express";
import { SaveImgController } from "../controller/Img/SaveImgController";

const saveImg = Router();

const saveImgController = new SaveImgController();

saveImg.post("/", saveImgController.handle)

export {saveImg};