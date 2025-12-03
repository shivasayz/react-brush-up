import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Account creation failed:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get();
    } catch (error) {
      console.error("error getting current user: ", error);
      // throw error;
    }
    return null;
  }

  async logout(){
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.log("logout error: ", error);
      throw error;
    }
  }

}

const authService = new AuthService();
export default authService;
