// src/services/user.service.ts
import appEventEmitter from "../events/EventEmitter";
import  {USER_EVENTS}  from "../constants/index";
import  logInfo  from "../utils/logger";
import { User } from "../types/expres";
import crypto from "crypto";

export class UserService {
  private users: User[] = [];

  createUser(data: { name: string; email: string }): User {
    const user: User = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.users.push(user);
    console.log(`User saved to in-memory DB: ${user.email}`);

    // Emit event
    appEventEmitter.emit(USER_EVENTS.CREATED, user);

    return user;
  }

  deleteUser(userId: string): boolean {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return false;

    const [deletedUser] = this.users.splice(index, 1);
    console.log(`User removed: ${deletedUser.email}`);

    // Emit event
    appEventEmitter.emit(USER_EVENTS.DELETED, deletedUser.id);
    return true;
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
