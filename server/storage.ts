import { type User, type InsertUser, type Version } from "@shared/schema";
import { randomUUID } from "crypto";
import { versionsData } from "./data/versions";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllVersions(): Promise<Version[]>;
  getVersion(id: string): Promise<Version | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private versions: Map<string, Version>;

  constructor() {
    this.users = new Map();
    this.versions = new Map();
    
    versionsData.forEach(version => {
      this.versions.set(version.id, version);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllVersions(): Promise<Version[]> {
    return Array.from(this.versions.values()).sort((a, b) => {
      const [aMajor, aMinor] = a.version.split('.').map(Number);
      const [bMajor, bMinor] = b.version.split('.').map(Number);
      if (aMajor !== bMajor) return bMajor - aMajor;
      return bMinor - aMinor;
    });
  }

  async getVersion(id: string): Promise<Version | undefined> {
    return this.versions.get(id);
  }
}

export const storage = new MemStorage();
