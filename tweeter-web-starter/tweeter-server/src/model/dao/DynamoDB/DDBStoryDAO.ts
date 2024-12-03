import { User, Status } from "tweeter-shared";
import { DataPage } from "../../entity/DataPage";
import { StatusEntity } from "../../entity/StatusEntity";
import { StoryDAO } from "../interface/StoryDAO";
import { DDBDAO } from "./DDBDAO";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class DDBStoryDAO extends DDBDAO<StatusEntity> implements StoryDAO {
    readonly author_handle = "author_handle";
    readonly time_stamp = "time_stamp";
    readonly status_json = "status_json";

    constructor(client: DynamoDBDocumentClient) {
        super("story", client);
    }

    newEntity(item: Record<string, any>): StatusEntity {
        return new StatusEntity(
            item[this.author_handle],
            item[this.time_stamp],
            item[this.status_json]
        );
    }

    generateGetItem(entity: StatusEntity) {
        return {
            [this.author_handle]: entity.handle,
            [this.time_stamp]: entity.time_stamp,
        };
    }

    generatePutItem(entity: StatusEntity) {
        return {
            [this.author_handle]: entity.handle,
            [this.time_stamp]: entity.time_stamp,
            [this.status_json]: entity.statusJson,
        };
    }

    //not being used so not implimented
    getUpdateExpression(): string {
        throw new Error("Method not implemented.");
    }
    //not being used so not implimented
    getUpdateExpressionAttributeValues(entity: StatusEntity) {
        throw new Error("Method not implemented.");
    }

    async recordStory(statusEntity: StatusEntity): Promise<void> {
        this.putItem(statusEntity);
    }

    async getStory(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<DataPage<StatusEntity>> {
        return await this.getPageOfItems({
            KeyConditionExpression: this.author_handle + " = :v",
            ExpressionAttributeValues: {
                ":v": user.alias,
            },
            TableName: this.tableName,
            Limit: pageSize,
            ExclusiveStartKey:
                lastItem === null
                    ? undefined
                    : {
                          [this.author_handle]: user.alias,
                          [this.time_stamp]: lastItem!.timestamp,
                      },
            ScanIndexForward: false,
        });
    }
}
