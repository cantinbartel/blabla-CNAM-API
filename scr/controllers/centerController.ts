import prisma from '../prisma';
import { Request, Response } from 'express';


/* GET - GET CENTERS */
export const getCenters = async (req: Request, res: Response): Promise<void> => {
    try {
        const centers = await prisma.center.findMany();
        res.json(centers);
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

/* GET - GET CENTER BY ID */
export const getCenterById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const center = await prisma.center.findFirst({
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
        const center = await prisma.center.findFirst({
            where: {
                city
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

/* DELETE - REMOVE CENTER */
export const deleteCenter = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      
      // Delete Center
      await prisma.center.delete({
          where: { id },
      });

      // Delete Orphan Fields
      const orphanFields = await prisma.field.findMany({
          where: {
              center: { none: {} }
          }
      });

      await Promise.all(orphanFields.map((field) =>
          prisma.field.delete({
              where: { id: field.id },
          })
      ));

      res.json({ message: `Center and its orphan fields deleted successfully` });
  } catch (error) {
      res.status(500).send(`Error: ${error}`);
  }
};