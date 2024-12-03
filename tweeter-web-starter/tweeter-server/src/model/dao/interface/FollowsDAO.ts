import { FollowEntity } from "../../entity/FollowEntity";
import { DataPage } from "../../entity/DataPage";

export interface FollowsDAO {
    getPageOfFollowers(
        followeeHandle: string,
        pageSize: number,
        lastFollowerHandle: string | undefined
    ): Promise<DataPage<FollowEntity>>;
    getPageOfFollowees(
        followerHandle: string,
        pageSize: number,
        lastFolloweeHandle: string | undefined
    ): Promise<DataPage<FollowEntity>>;
    putFollow(follow: FollowEntity): Promise<void>;
    getFollow(follow: FollowEntity): Promise<FollowEntity | undefined>;
    deleteFollow(follow: FollowEntity): Promise<void>;
}
