import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Entity } from "../../entity/Entity";
import { DataPage } from "../../entity/DataPage";

export abstract class DDBDAO<T extends Entity> {
    readonly tableName: string;

    protected readonly client: DynamoDBDocumentClient;

    constructor(tableName: string, client: DynamoDBDocumentClient) {
        this.tableName = tableName;
        this.client = client;
    }

    //might not be needed?
    // async recordItem(entity: T): Promise<void> {
    //     //load if it doesn't exist
    //     const itemInDatabase: T | undefined = await this.getItem(entity);
    //     if (itemInDatabase !== undefined) {
    //         console.log(
    //             "This item is already in the ",
    //             this.tableName,
    //             "table, updating values of existing item"
    //         );
    //         await this.updateItem(entity);
    //     } else {
    //         await this.putItem(entity);
    //     }
    // }

    async putItem(entity: T): Promise<void> {
        console.log("HIT")
        const params = {
            TableName: this.tableName,
            Item: this.generatePutItem(entity),
        };
        console.log("GENERATE PUT ITEM:" + this.generatePutItem(entity))
        try {
            await this.client.send(new PutCommand(params));
            console.log('Item inserted successfully.');
        } catch (error) {
            console.error('Error inserting item:', error);
        }
    }

    async updateItem(entity: T): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateGetItem(entity),
            UpdateExpression: this.getUpdateExpression(),
            ExpressionAttributeValues:
                this.getUpdateExpressionAttributeValues(entity),
        };
        await this.client.send(new UpdateCommand(params));
    }

    async getItem(entity: T): Promise<T | undefined> {
        const params = {
            TableName: this.tableName,
            Key: this.generateGetItem(entity),
        };
        const output = await this.client.send(new GetCommand(params));
        return output.Item == undefined
            ? undefined
            : this.newEntity(output.Item);
    }

    abstract newEntity(item: Record<string, any>): T;

    async deleteItem(entity: T): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: this.generateGetItem(entity),
        };
        await this.client.send(new DeleteCommand(params));
    }

    async getPageOfItems(params: any): Promise<DataPage<T>> {
        const items: T[] = [];
        const data = await this.client.send(new QueryCommand(params));
        const hasMorePages = data.LastEvaluatedKey !== undefined;
        data.Items?.forEach((item) => items.push(this.newEntity(item)));

        return new DataPage<T>(items, hasMorePages);
    }

    /**
     * This should take the shape of what you're searching for in the table
     * It should include the partition key and the sort key if applicable
     * @param entity any entity that extends the class Entity
     */
    abstract generateGetItem(entity: T): any;

    /**
     * This should take the shape of an entire row being put into
     * the table. Ideally it will have the same number of elements
     * as the entity.
     * @param entity any entity that extends the class Entity
     */
    abstract generatePutItem(entity: T): any;

    abstract getUpdateExpression(): string;

    abstract getUpdateExpressionAttributeValues(entity: T): any;
}
