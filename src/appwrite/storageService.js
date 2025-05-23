import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class StorageService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique,
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
