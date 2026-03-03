import 'dotenv/config';
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { taskRouter } from './controller/task.routes';
import { categoryRouter } from './controller/category.routes';
import { recipeRouter } from './controller/recipe.routes';
import { recipeTypeRouter } from './controller/recipeType.routes';
import { userRouter } from './controller/user.routes';
import { authRouter } from './controller/auth.routes';
import { authenticateToken } from './middleware/auth';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 4000;

// to be able to work with cookies
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.use('/auth', authRouter);

// PROTECTED
app.use('/tasks', authenticateToken, taskRouter);
app.use('/categories', authenticateToken, categoryRouter);
app.use('/recipes', authenticateToken, recipeRouter);
app.use('/recipeTypes', authenticateToken, recipeTypeRouter);
app.use('/users', authenticateToken, userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Homeview-backend',
            version: '0.0.2',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
app.use('/swagger', swaggerUi.serve, (req: Request, res: Response, next: NextFunction) => {
    // This forces swagger-jsdoc to re-scan your files on every refresh
    const freshSpec = swaggerJSDoc(swaggerOpts); 
    swaggerUi.setup(freshSpec)(req, res, next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error detected:", err.message);

    const status = err.status || 500;
    
    res.status(status).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});