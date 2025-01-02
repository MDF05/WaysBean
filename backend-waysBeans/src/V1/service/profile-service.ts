import { Profile } from "@prisma/client";
import profileRepository from "../repository/profile-repository";
import { profileDTO } from "../DTO/profile-DTO";

class ProfileService {
  async getProfileByUserId(userId: number): Promise<Profile> {
    const profile = await profileRepository.findProfileByUserId(userId);
    if (!profile) throw new Error("profile not found");
    return profile;
  }

  async getProfileByProfileId(profileId: number): Promise<Profile> {
    const profile = await profileRepository.findProfileByUserId(profileId);
    if (!profile) throw new Error("profile not found");
    return profile;
  }

  async putProfileByProfileId(profileId: number, newProfile: profileDTO): Promise<Profile> {
    const profile = await profileRepository.putProfileByProfileId(profileId, newProfile);
    if (!profile) throw new Error("failed to update profile");
    return profile;
  }
}

export default new ProfileService();
