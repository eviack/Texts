import { Router  } from "express";
import { checkAuth, login, logout, signUp, updateProfile, updateTheme } from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const authRoutes = Router()


authRoutes.route("/signup").post(signUp)
authRoutes.route("/login").post(login)
authRoutes.route("/logout").post(logout)
authRoutes.route("/update-profile").put(verifyJWT, updateProfile)

authRoutes.route("/check").get(verifyJWT, checkAuth)
authRoutes.route("/update-theme/:theme").put(verifyJWT, updateTheme)


export default authRoutes;