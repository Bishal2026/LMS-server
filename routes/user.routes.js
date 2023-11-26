import { Router } from "express";
import { login,register,logout,getProfile } from "../controllers/user.controllers.js";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getProfile);



export default router;