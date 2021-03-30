import { Gender } from './gender';

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  host: string | null;
  profileName: string | null;
  birthday: string | null;
  gender: Gender;
  isFederated: boolean;
}
