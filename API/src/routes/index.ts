import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { addFinancial } from "./addFinancial.routes";
import { sendInvitationFriend } from "./sendInvitationFriend.routes";
import { acceptRejectFriend } from "./acceptRejectFriend.routes";
import { addUser } from "./addUser.routes";
import { updateUser } from "./updateUser.routes";
import { authenticUser } from "./authenticUser.routes";
import { listFinancial } from "./listFinancial.routes";
import { saveImg } from "./saveUpdateIMG.routes";

const router = Router();


router.use("/addUser", addUser)
router.use("/UpIMG", ensureAuthenticated ,saveImg)
router.use("/updateUser", ensureAuthenticated ,updateUser)
router.use("/login", authenticUser)
router.use("/addFinancial", ensureAuthenticated, addFinancial)
router.use("/listFinancial", ensureAuthenticated, listFinancial)
router.use("/inviteFrindList", ensureAuthenticated, sendInvitationFriend)
router.use("/acceptRejectFriend", ensureAuthenticated, acceptRejectFriend)


export { router}