import {
    LoadMoreStatusItemsRequest,
    LoadMoreStatusItemsResponse,
} from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: LoadMoreStatusItemsRequest
): Promise<LoadMoreStatusItemsResponse> => {
    const request: LoadMoreStatusItemsRequest =
        LoadMoreStatusItemsRequest.fromJson(event);
    let response = new LoadMoreStatusItemsResponse(
        true,
        ...(await new StatusService(new DDBDAOFactory()).loadMoreFeedItems(
            request.authToken,
            request.user,
            request.pageSize,
            request.lastItem
        ))
    );
    return response;
};
