import {
    AuthToken,
    User,
    LoadMoreUserItemsResponse,
    LoadMoreUserItemsRequest,
    GetIsFollowerStatusResponse,
    GetIsFollowerStatusRequest,
    GetFollowCountResponse,
    FollowInfoRequest,
    GetFollowInfoResponse,
} from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class FollowService {
    private serverFacade: ServerFacade = new ServerFacade();

    public async loadMoreFollowers(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        let response: LoadMoreUserItemsResponse =
            await this.serverFacade.loadMoreFollowers(
                new LoadMoreUserItemsRequest(
                    authToken,
                    user,
                    pageSize,
                    lastItem
                )
            );
        return [response.pageOfUsers, response.hasMoreItems];
    }

    public async loadMoreFollowees(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        let response: LoadMoreUserItemsResponse =
            await this.serverFacade.loadMoreFollowees(
                new LoadMoreUserItemsRequest(
                    authToken,
                    user,
                    pageSize,
                    lastItem
                )
            );
        return [response.pageOfUsers, response.hasMoreItems];
    }

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        let response: GetIsFollowerStatusResponse =
            await this.serverFacade.getIsFollowerStatus(
                new GetIsFollowerStatusRequest(authToken, user, selectedUser)
            );
        return response.isFollower;
    }

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        let response: GetFollowCountResponse =
            await this.serverFacade.getFolloweesCount(
                new FollowInfoRequest(authToken, user)
            );
        return response.count;
    }

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        let response: GetFollowCountResponse =
            await this.serverFacade.getFollowersCount(
                new FollowInfoRequest(authToken, user)
            );
        return response.count;
    }

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        let response: GetFollowInfoResponse = await this.serverFacade.follow(
            new FollowInfoRequest(authToken, userToFollow)
        );
        return [response.numFollowers, response.numFollowees];
    }

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        let response: GetFollowInfoResponse = await this.serverFacade.unfollow(
            new FollowInfoRequest(authToken, userToUnfollow)
        );
        return [response.numFollowers, response.numFollowees];
    }
}
