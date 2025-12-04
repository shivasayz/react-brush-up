import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      //   throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        query
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // file services 
  async uploadFile(fileId) {
    try {
      return await this.storage(conf.appwriteBucketId, ID.unique(), fileId);
    } catch (error) {
      console.log("Error uploading file: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error deleting file: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error getting file preview: ", error);
      return false;
    }
  }
}

const service = new Service();
export default service;
