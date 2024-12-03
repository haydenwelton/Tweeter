import { AuthToken, User } from "tweeter-shared";
import { DAOFactory } from "../dao/interface/DAOFactory";
import { DataPage } from "../entity/DataPage";
import { FollowEntity } from "../entity/FollowEntity";
import { UserEntity } from "../entity/UserEntity";
import { Service } from "./Service";

export class FollowService extends Service {
    constructor(daoFactory: DAOFactory) {
        super(daoFactory);
    }

    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        this.verfiyRequestData([authToken, user, pageSize]);
        this.authenticate(authToken.token);

        const pageOfFollowers = await this.followsDAO.getPageOfFollowers(
            user.alias,
            pageSize,
            lastItem?.alias
        );
        // converting to array of user's followers
        const followers: User[] = [];
        for (let i = 0; i < pageOfFollowers.values.length; i++) {
            const followerHandle = pageOfFollowers.values[i].followerHandle;
            const userEntity: UserEntity | undefined =
                await this.usersDAO.getUser(followerHandle);
            if (userEntity !== undefined) {
                const follower = new User(
                    userEntity.firstName,
                    userEntity.lastName,
                    userEntity.alias,
                    userEntity.imageUrl
                );
                followers.push(follower);
            }
        }

        return [followers, pageOfFollowers.hasMorePages];
    }

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        this.verfiyRequestData([authToken, user, pageSize]);
        this.authenticate(authToken.token);

        const pageOfFollowees: DataPage<FollowEntity> =
            await this.followsDAO.getPageOfFollowees(
                user.alias,
                pageSize,
                lastItem?.alias
            );
        // converting to array of user's followees
        const followees: User[] = [];
        for (let i = 0; i < pageOfFollowees.values.length; i++) {
            const followeeHandle = pageOfFollowees.values[i].followeeHandle;
            const userEntity: UserEntity | undefined =
                await this.usersDAO.getUser(followeeHandle);
            if (userEntity !== undefined) {
                const followee = new User(
                    userEntity.firstName,
                    userEntity.lastName,
                    userEntity.alias,
                    userEntity.imageUrl
                );
                followees.push(followee);
            }
        }

        return [followees, pageOfFollowees.hasMorePages];
    }
}
