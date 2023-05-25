import { Router } from "express";

import { 
    addMessageByTopicId, 
    addTopic, 
    getAllMessagesByTopicId, 
    getAllTopics ,
    deleteMessagesByTopicId,
    getTopicById,
    updateTopicById,
    deleteTopicById
} from "../controllers/communicationController";

const router = Router();

router.get("/getAllMessagesByTopicId/:id", getAllMessagesByTopicId);
router.post("/addMessageByTopicId", addMessageByTopicId);
router.delete("/deleteMessageById/:id", deleteMessagesByTopicId);

router.get("/getAllTopics", getAllTopics); 
router.get("/getTopicById/:id", getTopicById);
router.post("/addTopic", addTopic);
router.put("/updateTopicById", updateTopicById);
router.delete("/deleteTopic/:id", deleteTopicById);

export default router;
