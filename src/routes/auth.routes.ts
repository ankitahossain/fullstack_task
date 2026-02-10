import { Router } from "express";
import { login } from "../controller/auth.controller";
import { registerViaInvite } from "../controller/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/register", registerViaInvite);

export default router;
