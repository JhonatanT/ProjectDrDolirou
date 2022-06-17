import { Router} from "express";
import { FriendListController } from "../controller/Chat/FriendListController";

const acceptRejectFriend = Router();

const friendListController = new FriendListController();

acceptRejectFriend.post("/", friendListController.handle_accept_reject)

export {acceptRejectFriend};