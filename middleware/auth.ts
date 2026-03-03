import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required.' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET is not defined');

        const decoded = jwt.verify(token, secret);

        // Attach user info to the request object for use in other routes
        (req as any).auth = decoded;

        next();
    } catch (error) {
        const authError = new Error('Unauthorized: Invalid token');
        (authError as any).status = 403;
        next(authError);
    }
};