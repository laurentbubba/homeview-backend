/**
 * @swagger
 *   components:
 *    schemas:
 *      AuthResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *            description: The JWT token.
 *          user:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *                format: int64
 *              username:
 *                type: string
 *                description: User name.
 *              firstName:
 *                type: string
 *                description: User first name.
 *              lastName:
 *                type: string
 *                description: User last name.
 *              email:
 *                type: string
 *                description: User email.
 *      AuthRequest:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            description: User name.
 *          password:
 *            type: string
 *            description: User password.
 *      SignupRequest:
 *        type: object
 *        properties:
 *          username:
 *            type: string
 *            description: User name.
 *          firstName:
 *            type: string
 *            description: User first name.
 *          lastName:
 *            type: string
 *            description: User last name.
 *          password:
 *            type: string
 *            description: User last name.
 *          email:
 *            type: string
 *            description: User email.
 *      SignupResponse:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          username:
 *            type: string
 *            description: User name.
 *          firstName:
 *            type: string
 *            description: User first name.
 *          lastName:
 *            type: string
 *            description: User last name.
 *          password:
 *            type: string
 *            description: User password.
 *          email:
 *            type: string
 *            description: User email.
 */
import express, { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';
import { AuthenticationInput, UserInput } from 'types';

const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: The JWT token, and user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authInput = <AuthenticationInput>req.body;

        
        const {token, user} = await authService.login(authInput);

        res.cookie('token', token, {
            httpOnly: true, // Prevents JS access (Security!)
            secure: true,
            sameSite: 'none',
            maxAge: 8 * 60 * 60 * 1000, // 8 hours
        });

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user.
 *     responses:
 *       200:
 *         description: boolean saying if logout was successful.
 */
authRouter.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const logoutStatus = await authService.logout();

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/', 
        });

        res.status(200).json(true);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user.
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       200:
 *         description: The created user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignupResponse'
 */
authRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signupInput = <UserInput>req.body;
        const signupResponse = await authService.signup(signupInput);
        res.status(200).json(signupResponse);
    } catch (error) {
        next(error);
    }
});

export { authRouter };
