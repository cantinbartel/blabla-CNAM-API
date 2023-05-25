import { Router } from "express";

import { 
    addUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    updateUserById,
    resetUserPassword,
} from "../controllers/userController";

const router = Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getUserById", getUserById);
router.post("/addUser", addUser);
router.put("/updateUserById/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);
router.put("/resetUserPassword/:araCode", resetUserPassword);


export default router;
