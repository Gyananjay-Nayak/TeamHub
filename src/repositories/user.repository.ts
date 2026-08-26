import { User, UserData } from "../types/user";

export class UserRepository {
  static userList: User[] = [];
  static nextId = 1;

  static findByEmail(email: string): User | undefined {
    return this.userList.find((user) => user.email === email);
  }

  static findById(id: number): User | undefined {
    return this.userList.find((user) => user.id === id);
  }

  static findAll(): User[] {
    return this.userList;
  }

  static create(userData: UserData): User {
    const user: User = {
      ...userData,
      id: UserRepository.nextId++,
    };
    UserRepository.userList.push(user);
    return user;
  }

  static update(user: User, userData: Partial<UserData>): User {
    if (userData.firstName !== undefined) {
      user.firstName = userData.firstName;
    }

    if (userData.lastName !== undefined) {
      user.lastName = userData.lastName;
    }

    if (userData.email !== undefined) {
      user.email = userData.email;
    }

    return user;
  }

  static delete(user: User): User {
    const index = UserRepository.userList.indexOf(user);
    return UserRepository.userList.splice(index, 1)[0];
  }
}
