import bcrypt from 'bcrypt';
import { User as UserPrisma } from '../generated/prisma';

export interface UserProps {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class User {
    readonly id?: number;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        this.validate(user)
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }

    validate(user: UserProps) {
        if (!user.username.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required');
        }
    }

    async comparePassword(plainTextPassword: string): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, this.password);
    }

    static async createWithHashedPassword(userData: UserProps): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        
        return new User({
            ...userData,
            password: hashedPassword
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.email === user.getEmail()
        );
    }

    static from({ id, username, firstName, lastName, email, password }: UserPrisma) {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
        });
    }
}