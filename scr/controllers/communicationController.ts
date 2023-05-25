import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllMessagesByTopicId = async (req: Request, res: Response): Promise<void> => {

  try {
      const topicId = req.params.id;

      const messages = await prisma.message.findMany({
      where: {
          topicId,
      },
      include: {
          author: true,
          topic: true,
      },
      });

      res.json(messages);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }

};

export const addMessageByTopicId = async (req: Request, res: Response): Promise<void> => {

    try {
        const topicId = req.params.id;
        const { authorId, content } = req.body;

        const message = await prisma.message.create({
        data: {
            author: {
              connect: { id: authorId },
            },
            content,
            date: new Date(),
            topic: {
              connect: { id: topicId },
            },
        },
        });

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

};

export const deleteMessagesByTopicId = async (req: Request, res: Response): Promise<void> => {

  try {
    const id = req.params.id;

    await prisma.message.deleteMany({
      where: { topicId: id },
    });

    res.json({ message: 'Messages deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting messages' });
  }

};

export const addTopic = async (req: Request, res: Response): Promise<void> => {

  try {
    const { title } = req.body;

    const topic = await prisma.topic.create({
      data: {
          title,
          closed: false
      }
    });

    res.json({message: "Topic created successfully ", topic});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating topic' });
  }

};

export const getAllTopics = async (req: Request, res: Response): Promise<void> => {

  try {
    const topics = await prisma.topic.findMany();

    res.json({ topics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving topics' });
  }

};

export const updateTopicById = async (req: Request, res: Response): Promise<void> => {

  try {
    const id = req.params.id;
    const { title, closed } = req.body;

    const updatedTopic = await prisma.topic.update({
      where: { id },
      data: {
        title,
        closed,
      },
    });

    res.json({ message: 'Topic updated successfully', topic: updatedTopic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating topic' });
  }
  
};

export const getTopicById = async (req: Request, res: Response): Promise<void> => {

  try {
    const id = req.params.id;

    const topic = await prisma.topic.findUnique({
      where: { id },
    });

    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    res.json({ topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving topic' });
  }

};

export const deleteTopicById = async (req: Request, res: Response): Promise<void> => {

  try {
    const id = req.params.id;

    await prisma.topic.delete({
      where: { id },
    });

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting topic' });
  }

};