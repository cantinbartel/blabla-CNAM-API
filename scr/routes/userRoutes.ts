import { Router } from "express";
import { protect, admin } from '../middlewares/authMiddleware';

import { 
    addUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById,
    verifyPassword
    // resetUserPassword,
} from "../controllers/userController";

const router = Router();

router.post("/verifyPassword", verifyPassword);

// Ajoutez 'protect' comme middleware à toutes les routes
router.use(protect);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

// Ajoutez 'admin' comme middleware aux routes qui nécessitent les droits d'administrateur
router.use(admin);

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/:id", deleteUserById);
// router.put("/resetUserPassword/:araCode", resetUserPassword);



export default router;
