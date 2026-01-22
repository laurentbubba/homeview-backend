import 'dotenv/config';
import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { taskRouter } from './controller/task.routes';
import { categoryRouter } from './controller/category.routes';
import { recipeRouter } from './controller/recipe.routes';
import { recipeTypeRouter } from './controller/recipeType.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);
app.use('/recipes', recipeRouter);
app.use('/recipeTypes', recipeTypeRouter);

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});