export interface UserType {
  _id: string,
  username: string,
  password: string,
  createdAt: string,
  updatedAt: string,
}

export interface AuthResult {
  success: boolean,
  message: string,
  user?: UserType,
  token?: string,
}

export interface UserResult {
  success: boolean,
  message: string,
}
