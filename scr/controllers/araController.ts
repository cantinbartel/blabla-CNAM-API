import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import prisma from '../prisma';


/* GET - GET ARA */
export const getAllAra = async (req: Request, res: Response): Promise<void> => {
    try {
        const ara = await prisma.ara.findMany();
        res.json(ara);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET - GET ARA BY ID */
export const getAraById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const ara = await prisma.ara.findUnique({
            where: {
                id: id
              },
        });
        res.json(ara);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* POST - CREATE ARA */
export const addAra = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, name, surname, user } = req.body;
      const ara = await prisma.ara.create({
        data: {
          id,
          name,
          surname,
          user: user ?? undefined,
        },
      });
      res.json(ara);
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  };

/* PUT - UPDATE ARA */
export const updateAra = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, surname, user } = req.body;

    const ara = await prisma.ara.update({
      where: {
        id: id,
      },
      data: {
        name,
        surname,
        user: user ?? undefined,
      },
    });

    res.json(ara);
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
};
  
  /* DELETE - DELETE ARA BY ID*/
  export const deleteAraById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const ara = await prisma.ara.delete({
        where: {
            id: id,
        },
      });
      res.json(ara);
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  };