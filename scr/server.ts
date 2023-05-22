import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import userRoutes from './routes/userRoutes';

dotenv.config()
const app: Application = express();
app.use(express.json());
app.use(cors());

// app.use('/api/users', userRoutes);

const port = Number(process.env.PORT!) | 8080;

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
}); 
