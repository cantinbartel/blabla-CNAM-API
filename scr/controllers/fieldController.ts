import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import prisma from '../prisma';


/* GET - GET FIELD */
export const getAllFields = async (req: Request, res: Response): Promise<void> => {
    try {
        const field = await prisma.field.findMany();
        res.json(field);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET - GET FIELD BY ID */
export const getFieldById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const field = await prisma.field.findUnique({
            where: {
                id: id
              },
        });
        res.json(field);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* POST - CREATE FIELD */
export const addField = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const field = await prisma.field.create({
        data: {
          name,
        },
      });
      res.json(field);
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  };

/* PUT - UPDATE FIELD */
export const updateField = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const field = await prisma.field.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });

    res.json(field);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
  
  /* DELETE - DELETE FIELD BY ID*/
  export const deleteFieldById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const field = await prisma.field.delete({
        where: {
            id: id,
        },
      });
      res.json(field);
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  };