import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { taskRouter } from './controller/task.routes';
import { categoryRouter } from './controller/category.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Homeview-backend',
            version: '0.0.1',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});