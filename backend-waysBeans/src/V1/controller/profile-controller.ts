import { Profile, User } from "@prisma/client";
import createError from "../utils/create-error";
import { NextFunction, Request, Response } from "express";
import successResponse from "../utils/success-response";
import profileService from "../service/profile-service";
import { profileDTO } from "../DTO/profile-DTO";
import cloudinary from "../libs/cloudinary";

class ProfileController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const user: User = res.locals.user;
      const profile: Profile = await profileService.getProfileByUserId(user.id);
      res.json(successResponse("data received", { profile }));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }

  async getProfileById(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId: number = parseInt(req.params.profileId);
      const profile: Profile = await profileService.getProfileByProfileId(profileId);
      res.json(successResponse("data received", { profile }));
    } catch (err: unknown) {
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }

  async putProfileById(req: Request, res: Response, next: NextFunction) {
    try {
      const profileId: number = parseInt(req.params.profileId);
      const newProfile: profileDTO = req.body;
      let imageUrl: null | string = null;

      console.log(newProfile);

      if (req.file) imageUrl = await cloudinary.uploaderSingle(req.file);
      if (imageUrl) newProfile.imageUrl = imageUrl;

      const profile: Profile = await profileService.putProfileByProfileId(profileId, newProfile);
      res.json(successResponse("data received", { profile }));
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) next(createError(err.message, 400));
      else next(createError("sorry server error ", 500));
    }
  }
}

export default new ProfileController();
