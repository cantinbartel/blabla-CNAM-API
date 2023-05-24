import prisma from '../prisma';
import { Request, Response } from 'express';


/* GET - GET CENTERS */
export const getCenters = async (req: Request, res: Response): Promise<void> => {
    try {
        const centers = prisma.center.findMany()
        res.json(centers);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET - GET CENTER BY ID */
export const getCenterById = async (req: Request, res: Response): Promise<void> => {
    console.log('INSIDE GET CENTER BY ID')
    const { id } = req.params;
    console.log('ID PARAMS', id)
    try {
        const center = prisma.center.findFirst({
            where: {
                id: id
            },
        })
        res.json(center);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET - GET FIELDS BY CENTER */
export const getFieldsByCenter = async (req: Request, res: Response): Promise<void> => {
    const { city } = req.body;
    try {
        const center = prisma.center.findFirst({
            where: {
                city: city
            },
            include: {
                field : true
            }
        })
        res.json(center);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* POST - CREATE CENTER */
export const createCenter = async (req: Request, res: Response): Promise<void> => {
    try {
      const { city, isCenter } = req.body;
      const center = await prisma.center.create({
        data: {
          city,
          isCenter
        },
      });
      res.json({ message: 'center created', center});
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  };

/* PUT - UPDATE CENTER */
export const updateCenter = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { city, isCenter } = req.body;
  
      const center = await prisma.center.update({
        where: {
          id: id,
        },
        data: {
          city,
          isCenter
        },
      });
  
      res.json({message: 'center updated', center});
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
};

/* DELETE - DELETE CENTER */
export const deleteCenter = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const center = await prisma.center.delete({
        where: {
            id: id,
        },
      });
      res.json({message: 'center deleted', center});
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  };
