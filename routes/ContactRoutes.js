import { Router } from "express";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";  // Correct the typo if needed
import { varifyToken } from "../middlewares/AuthMiddleware.js";  // Correct the typo if needed

const contactsRoutes = Router();

contactsRoutes.post("/search", varifyToken, searchContacts);  
contactsRoutes.get("/get-contacts-for-dm", varifyToken, getContactsForDMList);  


export default contactsRoutes;
