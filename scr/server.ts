import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import araRoutes from './routes/araRoutes';
import fieldRoutes from './routes/fieldRoutes';
import centerRoutes from './routes/centerRoutes';
import communicationRouter from "./routes/communicationRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config()
const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/ara', araRoutes);
app.use('/api/fields', fieldRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/communication', communicationRouter);
app.use('/api/user', userRouter);

const port = Number(process.env.PORT!) | 8080;

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
}); 