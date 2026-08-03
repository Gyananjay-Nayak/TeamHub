export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}
export interface User extends UserData {
  id: number;
}
