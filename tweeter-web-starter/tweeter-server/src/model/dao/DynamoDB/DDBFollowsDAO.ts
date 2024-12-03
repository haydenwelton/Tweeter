import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { FollowEntity } from "../../entity/FollowEntity";
import { DataPage } from "../../entity/DataPage";
import { FollowsDAO } from "../interface/FollowsDAO";
import { DDBDAO } from "./DDBDAO";

export class DDBFollowsDAO extends DDBDAO<FollowEntity> implements FollowsDAO {
    readonly indexName = "follows_index";
    readonly followerHandle = "follower_handle";
    readonly followeeHandle = "followee_handle";
    readonly followerName = "follower_name";
    readonly followeeName = "followee_name";

    constructor(client: DynamoDBDocumentClient) {
        super("follows", client);
    }
    
    newEntity(item: Record<string, any>): FollowEntity {
        return new FollowEntity(
            item[this.followerHandle],
            item[this.followerName],
            item[this.followeeHandle],
            item[this.followeeName]
        );
    }

    generateGetItem(entity: FollowEntity) {
        return {
            [this.followerHandle]: entity.followerHandle,
            [this.followeeHandle]: entity.followeeHandle,
        };
    }
    generatePutItem(entity: FollowEntity) {
        console.log("GENERATE HIT")
        return {
            [this.followerHandle]: entity.followerHandle,
            [this.followerName]: entity.followerName,
            [this.followeeHandle]: entity.followeeHandle,
            [this.followeeName]: entity.followeeName,
        };
    }


    async putFollow(follow: FollowEntity): Promise<void> {
        console.log(follow.followerHandle)
        console.log(follow.followerName)
        console.log(follow.followeeHandle)
        console.log(follow.followeeName)
        await this.putItem(follow)
    }

    async updateNames(follow: FollowEntity): Promise<void> {
        await this.updateItem(follow);
    }

    async getFollow(follow: FollowEntity): Promise<FollowEntity | undefined> {
        return this.getItem(follow);
    }

    async deleteFollow(follow: FollowEntity): Promise<void> {
        await this.deleteItem(follow);
    }

    async getPageOfFollowees(
        followerHandle: string,
        pageSize: number,
        lastFolloweeHandle: string | undefined = undefined
    ): Promise<DataPage<FollowEntity>> {
        return await this.getPageOfItems({
            KeyConditionExpression: this.followerHandle + " = :v",
            ExpressionAttributeValues: {
                ":v": followerHandle,
            },
            TableName: this.tableName,
            Limit: pageSize,
            ExclusiveStartKey:
                lastFolloweeHandle === undefined
                    ? undefined
                    : {
                          [this.followerHandle]: followerHandle,
                          [this.followeeHandle]: lastFolloweeHandle,
                      },
        });
    }

    async getPageOfFollowers(
        followeeHandle: string,
        pageSize: number,
        lastFollowerHandle: string | undefined = undefined
    ): Promise<DataPage<FollowEntity>> {
        return await this.getPageOfItems({
            KeyConditionExpression: this.followeeHandle + " = :v",
            ExpressionAttributeValues: {
                ":v": followeeHandle,
            },
            TableName: this.tableName,
            IndexName: this.indexName,
            Limit: pageSize,
            ExclusiveStartKey:
                lastFollowerHandle === undefined
                    ? undefined
                    : {
                          [this.followeeHandle]: followeeHandle,
                          [this.followerHandle]: lastFollowerHandle,
                      },
        });
    }

    getUpdateExpression(): string {
        return "set follower_name = :value1, followee_name = :value2";
    }
    getUpdateExpressionAttributeValues(entity: FollowEntity) {
        return {
            ":value1": entity.followerName,
            ":value2": entity.followeeName,
        };
    }
}
