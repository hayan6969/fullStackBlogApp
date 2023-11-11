import conf from './conf.js';

import {Client,ID, Databases, Storage, Query} from 'appwrite';

export class Service{
    client =new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    
    }

    async createPost({title,slug, content, featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage,status}){
       
        try {
            return await this.databases.updateDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){

        try {
            return await this.databases.deleteDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
            )
            true;
        } catch (error) {
            throw error;
            return false;
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                slug,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getposts(queries = [Query.equal("status","active")]){

        try {

            return await this.databases.listDocuments(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseId,
                queries,
                100,
                0,
                "createdAt",
                "DESC"
            )
            
        } catch (error) {
            throw error;
            return false;
        }

    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}

const service=new Service();
export default service;