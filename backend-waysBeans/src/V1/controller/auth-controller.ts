import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import { LoginDTO } from "../DTO/login-DTO";
import authService from "../service/auth-service";
import successResponse from "../utils/success-response";
import { User } from "@prisma/client";
import { registerDTO } from "../DTO/register-DTO";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body: LoginDTO = req.body;

      const loginResponse = await authService.login(body);

      res.status(200).json(successResponse("user successfully login", loginResponse));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body: registerDTO = req.body;

      const registeResponse: Omit<User, "password"> = await authService.register(body);

      res.status(200).json(successResponse("user successfully registered", registeResponse));
    } catch (err) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("An error occurred", 500));
    }
  }

  async checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) throw new Error("token is not valid");

      const user: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);

      res.status(200).json(successResponse("user successfully registered", { user, token }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        next(createError(err.message, 400));
      } else next(createError("An error occurred", 500));
    }
  }
}

export default new AuthController();
