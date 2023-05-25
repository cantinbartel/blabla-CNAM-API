import { Request, Response } from 'express';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';

export interface Payload {
  id: string;
  araCode: string;
  username: string;
  role: string;
}

export function generateToken(payload: Payload): string {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Clé secrète manquante dans les variables d\'environnement');
  }

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

export function validateToken(token: string): Payload {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Clé secrète manquante dans les variables d\'environnement');
  }

  try {
    const decoded = jwt.verify(token, secretKey) as Payload;
    return decoded;
  } catch (err) {
    throw new Error('Token invalide');
  }
}

/*

export const protect = async (req: Request, res: Response) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        token = req.headers.authorization.split(' ')[1];

        //const decoded = jwt.verify(token, process.env.SECRET_KEY);

        //const user = await prisma.user.findUnique(decoded.id);

    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }
}

const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
      next()
  } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
  }
}

*/

export default { generateToken, validateToken };
