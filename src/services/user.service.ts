import { User, UserData } from "../types/user";
import { AppError } from "../errors/AppError";

import { UserRepository } from "../repositories/user.repository";

export const createUser = (userData: UserData): User => {
  if (UserRepository.findByEmail(userData.email)) {
    throw new AppError(
      "User with this email already exists",
      409,
      "DUPLICATE_EMAIL",
    );
  }
  const user: User = UserRepository.create(userData);
  return user;
};
export const getUserList = (): User[] => {
  return UserRepository.findAll();
};
export const getUserById = (id: number): User => {
  const user = UserRepository.findById(id);
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }
  return user;
};
export const updateUserById = (
  id: number,
  userData: Partial<UserData>,
): User => {
  const user = UserRepository.findById(id);
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }
  if (userData.email !== undefined) {
    const existingUser = UserRepository.findByEmail(userData.email);

    if (existingUser && existingUser.id !== id) {
      throw new AppError(
        "User with this email already exists",
        409,
        "DUPLICATE_EMAIL",
      );
    }
  }
  return UserRepository.update(user, userData);
};

export const deleteUserById = (id: number): User => {
  const user = UserRepository.findById(id);
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }
  return UserRepository.delete(user);
};
