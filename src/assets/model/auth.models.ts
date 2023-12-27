export interface LoginFormModel {
  username: string;
  password: string;
}

export interface RegisterFormModel {
  username: string;
  password: string;
  confirmPassword: string;
}

// ===

export type DataUserModel = UserModel[];

export interface UserModel {
  username: string;
  password: string;
  date: Date | string;
  favorite: number[];
}
