import { Status, User } from "tweeter-shared";
import { DataPage } from "../../entity/DataPage";
import { StatusEntity } from "../../entity/StatusEntity";

export interface FeedDAO {
    addStatus(statusEntity: StatusEntity): Promise<void>;
    getFeed(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<DataPage<StatusEntity>>;
    putBatchStatus(feedOwnerHandles: string[], status: Status): Promise<void>;
}
