import {
    AuthToken,
    User,
    Status,
    LoadMoreStatusItemsResponse,
    LoadMoreStatusItemsRequest,
    PostStatusRequest,
} from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class StatusService {
    private serverFacade = new ServerFacade();

    public async loadMoreFeedItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        let response: LoadMoreStatusItemsResponse =
            await this.serverFacade.loadMoreFeedItems(
                new LoadMoreStatusItemsRequest(
                    authToken,
                    user,
                    pageSize,
                    lastItem
                )
            );
        return [response.pageOfStatuses, response.hasMoreItems];
    }

    public async loadMoreStoryItems(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        let response: LoadMoreStatusItemsResponse =
            await this.serverFacade.loadMoreStoryItems(
                new LoadMoreStatusItemsRequest(
                    authToken,
                    user,
                    pageSize,
                    lastItem
                )
            );
        return [response.pageOfStatuses, response.hasMoreItems];
    }

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
    ): Promise<void> {
        await this.serverFacade.postStatus(
            new PostStatusRequest(authToken, newStatus)
        );
    }
}
