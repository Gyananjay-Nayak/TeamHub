import { User, UserData } from "../types/user";

const userList: User[] = [];
let nextId = 1;

export const findUserByEmail = (email: string): User | undefined => {
  return userList.find((user) => user.email === email);
};

export const createUser = (userData: UserData): User => {
  if (findUserByEmail(userData.email)) {
    throw new Error("DUPLICATE_EMAIL");
  }
  const user: User = {
    ...userData,
    id: nextId++,
  };
  userList.push(user);
  return user;
};
export const getUserList = (): User[] => {
  return userList;
};
export const getUserById = (id: number): User | null => {
  const user = userList.find((user) => user.id === id);
  return user ?? null;
};
export const updateUserById = (
  id: number,
  userData: Partial<UserData>,
): User | null => {
  const user = userList.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  if (userData.firstName !== undefined) {
    user.firstName = userData.firstName;
  }
  if (userData.lastName !== undefined) {
    user.lastName = userData.lastName;
  }
  if (userData.email) {
    const existingUser = findUserByEmail(userData.email);
    if (existingUser && existingUser.id !== id) {
      throw new Error("DUPLICATE_EMAIL");
    }
    user.email = userData.email;
  }
  return user;
};
export const deleteUserById = (id: number): User | null => {
  const index = userList.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  return userList.splice(index, 1)[0];
};
