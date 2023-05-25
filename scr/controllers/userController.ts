import { Request, Response } from "express";
import prisma from "../prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {

    try {
        const users = await prisma.user.findMany();
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving users' });
    }

};

/*Vérification d'un mot de passe

const enteredPassword = 'password';
bcrypt.compare(enteredPassword, hashedPassword, function(err, result) {
    if (result) {
        console.log("Mot de passe correct");
    } else {
        console.log("Mot de passe incorrect");
    }
});

*/

export const getUserById = async (req: Request, res: Response): Promise<void> => {

    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving user' });
    }

};

export const addUser = async (req: Request, res: Response): Promise<void> => {

    try {
        const { code, email, password, centerId, fieldId } = req.body;
    
        bcrypt.hash(password, 10, async function(err, hashedPassword) {
            try {
                if (err) {
                    throw err;
                }
    
                const newUser = await prisma.user.create({
                    data: {
                        ara: {
                            connect: { id: code }
                        },
                        email,
                        password: hashedPassword,
                        role: Role.BASIC,
                        center: {
                            connect: { id: centerId }
                        },
                        field: {
                            connect: { id: fieldId }
                        },
                        blackListed: false,
                    },
                });
    
                res.json({ message: 'User created successfully', user: newUser });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Error creating user' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }

};

export const updateUserById = async (req: Request, res: Response): Promise<void> => {

    try {
        const id = req.params.id;
        const { email, password, role } = req.body;

        const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            email,
            password,
            role,
        },
        });

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }

};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {

    try {
        const id = req.params.id;

        await prisma.user.delete({
        where: { id },
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }

};