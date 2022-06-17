import { Router} from "express";
import { AddfinancialController } from "../controller/Financial/AddfinancialController";

const addFinancial = Router();

const addfinancialController = new AddfinancialController();

addFinancial.post("/", addfinancialController.handle)

export {addFinancial};