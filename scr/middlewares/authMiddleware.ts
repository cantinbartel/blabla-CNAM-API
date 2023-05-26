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
            console.log('DECODED TOKEN....', decoded)
            // const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // if (typeof decoded === 'object' && 'payload' in decoded && 'userId' in decoded.payload) {
            //     req.user = await prisma.user.findUnique({ where: { id: decoded.payload.userId } });
            // } else {
            //     res.json('Invalid token');
            //     return;
            // }


            console.log('PAYLOAD USER ID', decoded)

            if (typeof decoded === 'object' && 'payload' in decoded && 'userId' in decoded.payload && 'araCode' in decoded.payload) {
                req.user = await prisma.user.findUnique({ where: { id: decoded.payload.userId } });
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
    // if(req.user && req.user.isAdmin) {
    console.log('VALUE OF REQ USER ROLE')
    if(req.user && req.user.role === 'ADMIN') {
        console.log('REQ USER', req.user)
        next()
    } else {
        res.status(401)
        res.json('Not authorized as an admin')
    }
}

export { protect, admin }
