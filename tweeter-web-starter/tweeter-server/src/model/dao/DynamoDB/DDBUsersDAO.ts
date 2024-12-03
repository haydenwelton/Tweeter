import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { UserEntity } from "../../entity/UserEntity";
import { UsersDAO } from "../interface/UsersDAO";
import { DDBDAO } from "./DDBDAO";
export class DDBUsersDAO extends DDBDAO<UserEntity> implements UsersDAO {
    readonly first_name = "first_name";
    readonly last_name = "last_name";
    readonly handle = "handle";
    readonly image_url = "image_url";
    readonly password = "password";
    readonly num_followers = "num_followers";
    readonly num_followees = "num_followees";

    constructor(client: DynamoDBDocumentClient) {
        super("users", client);
    }

    newEntity(item: Record<string, any>): UserEntity {
        return new UserEntity(
            item[this.first_name],
            item[this.last_name],
            item[this.handle],
            item[this.image_url],
            item[this.password],
            item[this.num_followers],
            item[this.num_followees]
        );
    }

    generateGetItem(entity: UserEntity) {
        return {
            [this.handle]: entity.alias,
        };
    }

    generatePutItem(entity: UserEntity) {
        return {
            [this.handle]: entity.alias,
            [this.first_name]: entity.firstName,
            [this.last_name]: entity.lastName,
            [this.image_url]: entity.imageUrl,
            [this.password]: entity.password,
            [this.num_followers]: entity.numFollowers,
            [this.num_followees]: entity.numFollowees,
        };
    }

    getUpdateExpression(): string {
        return "set num_followers = :value1, num_followees = :value2";
    }

    getUpdateExpressionAttributeValues(entity: UserEntity) {
        return {
            ":value1": entity.numFollowers,
            ":value2": entity.numFollowees,
        };
    }

    async loginUser(
        alias: string,
        password: string
    ): Promise<UserEntity | undefined> {
        const userEntity = await this.getUser(alias);
        if (userEntity === undefined) {
            return undefined;
        }
        const CryptoJS = require("crypto-js");
        let hashPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);
        if (hashPassword === userEntity.password) {
            return userEntity;
        } else {
            return undefined;
        }
    }

    async registerUser(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageUrl: string
    ): Promise<UserEntity | undefined> {
        //hashing the password
        const CryptoJS = require("crypto-js");
        let hashPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);

        const newUserEntity = new UserEntity(
            firstName,
            lastName,
            alias,
            imageUrl,
            hashPassword,
            0,
            0
        );
        //putting new user into the table
        await this.putItem(newUserEntity);
        return newUserEntity;
    }

    async getUser(userHandle: string): Promise<UserEntity | undefined> {
        const handle = userHandle.substring(userHandle.lastIndexOf('/') + 1);
        return this.getItem(new UserEntity("", "", handle, "", "", 0, 0));
    }

    async updateNumFollowing(handle: string, numToAdd: number): Promise<void> {
        //getting the user to update
        const userToUpdate: UserEntity | undefined = await this.getItem(
            new UserEntity("", "", handle, "", "", 0, 0)
        );
        //updating the following count
        if (userToUpdate !== undefined) {
            userToUpdate.numFollowees += numToAdd;
            await this.updateItem(userToUpdate);
        }
    }
    async updateNumFollowers(handle: string, numToAdd: number): Promise<void> {
        //getting the user to update
        const userToUpdate: UserEntity | undefined = await this.getItem(
            new UserEntity("", "", handle, "", "", 0, 0)
        );
        //updating the following count
        if (userToUpdate !== undefined) {
            userToUpdate.numFollowers += numToAdd;
            await this.updateItem(userToUpdate);
        }
    }
}
