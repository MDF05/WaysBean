import { Cart, Product, User } from "@prisma/client";
import { LoginDTO } from "../DTO/login-DTO";
import prisma from "../libs/prisma";
import { registerDTO } from "../DTO/register-DTO";
import { CartDTO } from "../DTO/cart-DTO";
import { ImageUrlTypes } from "./../utils/types/image-url-types";

class UserRepository {
  async findNameOrEmail(dto: LoginDTO): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: dto.nameOrEmail }, { profile: { name: dto.nameOrEmail } }],
      },
      include: {
        profile: true,
        cart: {
          select: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        _count: {
          select: {
            cart: true,
          },
        },
      },
    });
    return user;
  }

  async checkUserByNameOrEmail(nameOrEmail: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: nameOrEmail }, { profile: { name: nameOrEmail } }],
      },
    });
    return user;
  }

  async createUser(dto: registerDTO): Promise<User> {
    const { name, ...otherDto } = dto;
    const user = await prisma.user.create({
      data: {
        ...otherDto,
        profile: {
          create: {
            name,
          },
        },
      },
    });

    return user;
  }

  async findCartByUserId(userId: number): Promise<CartDTO> {
    const user: CartDTO | null = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        cart: {
          select: {
            id: true,
            countItem: true,
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        _count: {
          select: {
            cart: true,
          },
        },
      },
    });

    if (!user) throw new Error("cannot find cart user");
    return user;
  }
}

export default new UserRepository();
