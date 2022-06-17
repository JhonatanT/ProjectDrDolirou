import { Router} from "express";
import { ListfinancialController } from "../controller/Financial/ListfinancialController";

const listFinancial = Router();

const listfinancialController = new ListfinancialController();

listFinancial.get("/", listfinancialController.handle)

export {listFinancial};