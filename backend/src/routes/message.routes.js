import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";
import { updateTheme } from "../controllers/auth.controller.js";

const messageRoutes = Router()

messageRoutes.route("/users").get(verifyJWT, getUsers)
messageRoutes.route("/:id").get( verifyJWT, getMessages)
messageRoutes.route("/send/:id").post( verifyJWT, sendMessage)

export default messageRoutes