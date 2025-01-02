import { User } from '@prisma/client';

export interface LoginDTO {
    nameOrEmail: string;
    password: string;
}

export interface loginResponseDTO {
    token: string;
    user: Omit<User, "password">;
}