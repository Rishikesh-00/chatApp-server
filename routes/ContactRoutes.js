import { Router } from "express";
import { searchContacts } from "../controllers/ContactsController.js";  // Correct the typo if needed
import { varifyToken } from "../middlewares/AuthMiddleware.js";  // Correct the typo if needed

const contactsRoutes = Router();

contactsRoutes.post("/search", varifyToken, searchContacts);  // Make sure these functions are correctly named

export default contactsRoutes;
