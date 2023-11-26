import { Router } from "express";
import { login,register,logout,getProfile } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.midellware.js";

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn ,getProfile);



export default router;