import { Router } from "express";
import { getMessages } from "../controllers/MessagesController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";

const messagesRoutes=Router();
messagesRoutes.post("/get-messages",varifyToken,getMessages)

export default messagesRoutes;