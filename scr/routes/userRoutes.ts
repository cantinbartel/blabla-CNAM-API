import { Router } from "express";

import { 
    addUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById,
    resetUserPassword
} from "../controllers/userController";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.post("/addUser", addUser);
router.put("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);
router.put("/resetUserPassword/:id", resetUserPassword);


export default router;
