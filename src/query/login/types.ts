import { User } from "../user/types";

export type LoginResult = {
  accessToken: string;
  expireTime: number;
  refreshToken: string;
  user: User;
};
