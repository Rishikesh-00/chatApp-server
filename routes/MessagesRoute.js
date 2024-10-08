import { Router } from "express";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const messagesRoutes=Router();

const upload=multer({dest:"uploads/files"});
messagesRoutes.post("/upload-file",varifyToken,upload.single("file"),uploadFile)
messagesRoutes.post("/get-messages",varifyToken,getMessages)

export default messagesRoutes;