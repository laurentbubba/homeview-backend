import { UserInput } from 'types';
import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const createUser = async ({
    username,
    firstName,
    lastName,
    email,
    password,
}: UserInput): Promise<User> => {
    const user = await User.createWithHashedPassword({ username, firstName, lastName, email, password });

    return await userDb.createUser(user);
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
    const user = await userDb.getUserByUsername(username);
    if (!user) throw new Error(`User with username ${username} does not exist.`);
    return user;
};

export default {
    getAllUsers,
    createUser,
    getUserById,
    getUserByUsername,
};