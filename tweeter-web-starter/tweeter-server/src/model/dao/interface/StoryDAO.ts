import { Status, User } from "tweeter-shared";
import { DataPage } from "../../entity/DataPage";
import { StatusEntity } from "../../entity/StatusEntity";

export interface StoryDAO {
    recordStory(statusEntity: StatusEntity): Promise<void>;
    getStory(
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<DataPage<StatusEntity>>;
}
