declare global {
    namespace Express {
        export interface Request {
            user?: any;  // Remplacez any par le type réel de votre utilisateur
        }
    }
}

