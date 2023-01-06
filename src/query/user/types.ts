export type User = {
  isPasswordSettingStatus?: "SETTING" | "NO_SETTING";
  uid: string;
  email?: string;
  mobileNo?: string;
  nickname?: string;
  avatar?: string;
};
