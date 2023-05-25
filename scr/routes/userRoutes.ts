import { Router } from "express";

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

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
// router.put("/resetUserPassword/:araCode", resetUserPassword);

router.post("/verifyPassword", verifyPassword);


export default router;
