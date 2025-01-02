import { User } from "@prisma/client";
import { LoginDTO, loginResponseDTO } from "../DTO/login-DTO";
import { registerDTO } from "../DTO/register-DTO";
import userRepository from "../repository/user-repository";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

class AuhtService {
  async login(dto: LoginDTO): Promise<loginResponseDTO> {
    const user: User | null = await userRepository.findNameOrEmail(dto);
    if (!user) throw new Error("username or password not correct");

    const isPasswordMatch: boolean = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMatch) throw new Error("username or password not correct");

    const { password, ...otherDetailUser } = user;
    const token: string = jwt.sign(otherDetailUser, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return { user: otherDetailUser, token };
  }

  async register(dto: registerDTO): Promise<Omit<User, "password">> {
    const existUser: User | null = await userRepository.checkUserByNameOrEmail(dto.email);
    if (existUser) throw new Error("user already exist");

    const { password: passwordDTO, ...otherDTO } = dto;
    const hashPassword = await bcrypt.hash(passwordDTO, 10);

    const user: User = await userRepository.createUser({ ...otherDTO, password: hashPassword });
    const { password, ...otherDetailUser } = user;

    return otherDetailUser;
  }
}

export default new AuhtService();
