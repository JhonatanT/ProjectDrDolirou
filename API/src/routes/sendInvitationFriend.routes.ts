import { Router} from "express";
import { FriendListController } from "../controller/Chat/FriendListController";

const sendInvitationFriend = Router();

const friendListController = new FriendListController();

sendInvitationFriend.post("/", friendListController.handle_send_invitation_friend)

export {sendInvitationFriend};