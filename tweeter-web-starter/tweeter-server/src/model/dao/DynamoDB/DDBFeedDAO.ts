import { User, Status } from "tweeter-shared";
import { DataPage } from "../../entity/DataPage";
import { StatusEntity } from "../../entity/StatusEntity";
import { FeedDAO } from "../interface/FeedDAO";
import { DDBDAO } from "./DDBDAO";
import {
    BatchWriteCommand,
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

export class DDBFeedDAO extends DDBDAO<StatusEntity> implements FeedDAO {
    readonly owner_handle = "owner_handle";
    readonly time_stamp = "time_stamp";
    readonly status_json = "status_json";

    readonly BATCH_SIZE = 25;

    constructor(client: DynamoDBDocumentClient) {
        super("feed", client);
    }

    newEntity(item: Record<string, any>): StatusEntity {
        return new StatusEntity(
            item[this.owner_handle],
            item[this.time_stamp],
            item[this.status_json]
        );
    }

    generateGetItem(entity: StatusEntity) {
        return {
            [this.owner_handle]: entity.handle,
            [this.time_stamp]: entity.time_stamp,
        };
    }

    generatePutItem(entity: StatusEntity) {
        return {
            [this.owner_handle]: entity.handle,
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

    async addStatus(statusEntity: StatusEntity): Promise<void> {
        await this.putItem(statusEntity);
    }

    async putBatchStatus(feedOwnerHandles: string[], status: Status) {
        console.log("SIZE OF HANDLES: " + feedOwnerHandles.length);
        let testCount = 0;

        for (let i = 0; i < feedOwnerHandles.length; i += this.BATCH_SIZE) {
            let items = [];
            const batchSize = Math.min(this.BATCH_SIZE, feedOwnerHandles.length - i);

            console.log("OWNERHANDLE: " + feedOwnerHandles[i]);
            
            for (let j = 0; j < batchSize; j++) {
                const putItem = this.generatePutItem(
                    new StatusEntity(
                        feedOwnerHandles[i + j],
                        status.timestamp,
                        status.toJson()
                    )
                );
                const putRequest = {
                    PutRequest: {
                        Item: putItem
                    }
                };
                items.push(putRequest);
                console.log(putRequest);
                testCount = testCount + j;
            }

            const params = {
                RequestItems: {
                    [this.tableName]: items,
                },
            };

            await this.delay(1000); 
            await this.client.send(new BatchWriteCommand(params));
        }

        console.log("TEST COUNT: " + testCount);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getFeed(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<DataPage<StatusEntity>> {
        return await this.getPageOfItems({
            KeyConditionExpression: this.owner_handle + " = :v",
            ExpressionAttributeValues: {
                ":v": user.alias,
            },
            TableName: this.tableName,
            Limit: pageSize,
            ExclusiveStartKey:
                lastItem === null
                    ? undefined
                    : {
                          [this.owner_handle]: user.alias,
                          [this.time_stamp]: lastItem!.timestamp,
                      },
            ScanIndexForward: false,
        });
    }
}
