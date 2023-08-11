import { atom } from "recoil";

/* User */
export const userAuthenticated = atom({
  key: "user",
  default: undefined,
});

/* Token Notification */
export const tokenNotification = atom({
  key: "token",
  default: undefined,
});
