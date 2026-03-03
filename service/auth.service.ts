import { AuthenticationInput, AuthenticationResponse, UserInput } from 'types';
import { User } from '../model/user';
import userService from './user.service';
import jwt from 'jsonwebtoken';

const login = async ({
    username,
    password,
}: AuthenticationInput): Promise<AuthenticationResponse> => {
    const user = await userService.getUserByUsername(username);
    if (!user) throw new Error(`User with username ${username} does not exist.`);

    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) throw new Error(`Invalid password for user ${username}`);

    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.getId(),
            username: user.getUsername(),
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
        }
    };
};

const signup = async (userInput: UserInput): Promise<User> => {
    return await userService.createUser(userInput);
};

const generateToken = (user: User): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined in .env");

    return jwt.sign(
        { 
            id: user.getId(), 
            username: user.getUsername() 
        }, 
        secret, 
        { expiresIn: '8h' }
    );
};

export default {
    login,
    signup,
};