import { Profile } from "@prisma/client";
import prisma from "../libs/prisma";
import { profileDTO } from "../DTO/profile-DTO";

class ProfileRepository {
  async findProfileByUserId(userId: number): Promise<Profile | null> {
    const profile = await prisma.profile.findFirst({
      where: {
        userId,
      },
      include: {
        Transaction: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return profile;
  }
  async findProfileById(id: number): Promise<Profile | null> {
    const profile = await prisma.profile.findFirst({
      where: {
        id,
      },
    });

    return profile;
  }

  async putProfileByProfileId(id: number, newProfile: profileDTO): Promise<Profile | null> {
    const { email, ...attributeProfile } = newProfile;

    const profile = await prisma.profile.update({
      where: {
        id,
      },
      data: {
        ...attributeProfile,

        user: {
          update: {
            email,
          },
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return profile;
  }
}

export default new ProfileRepository();
