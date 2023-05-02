export interface AccountDTO {
  id: number;
  name: string;
  email: string;
  emailVerified?: boolean;
}

export interface AccountRegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface AccountLoginDTO {
  email: string;
  name: string;
  emailVerified?: boolean;
}
