import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import prisma from '../prisma';

const protect = async(req: any, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            if (!process.env.JWT_SECRET) {
                res.json('JWT_SECRET must be defined');
                return
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (typeof decoded === 'object' && 'id' in decoded) {
                req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
            } else {
                res.json('Invalid token');
                return
            }
            

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            res.json('Not authorized, token failed')
            return
        }
    }
    if (!token) {
        res.status(401)
        // throw new Error('Not Authorized, no token')
        res.json('Not Authorized, no token')
        return
    }
}

const admin = (req: any, res: Response, next: NextFunction) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }
