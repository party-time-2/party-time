export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}
export interface AccountRegisterDTO {
  name: string;
  email: string;
  password: string;
}
export interface AccountDTO {
  id: number;
  name: string;
  email: string;
}
export interface AccountDeleteDTO {
  password: string;
}
