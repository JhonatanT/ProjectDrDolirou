import { Router} from "express";
import { AuthenticUserController } from "../controller/User/AuthenticUserController";

const authenticUser = Router();

const authenticUserController = new AuthenticUserController();

authenticUser.post("/", authenticUserController.handle)

export { authenticUser };