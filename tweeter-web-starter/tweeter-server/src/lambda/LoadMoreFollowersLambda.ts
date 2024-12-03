import {
    LoadMoreUserItemsRequest,
    LoadMoreUserItemsResponse,
} from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: LoadMoreUserItemsRequest
): Promise<LoadMoreUserItemsResponse> => {
    const request: LoadMoreUserItemsRequest =
        LoadMoreUserItemsRequest.fromJson(event);
    let response = new LoadMoreUserItemsResponse(
        true,
        ...(await new FollowService(new DDBDAOFactory()).loadMoreFollowers(
            request.authToken,
            request.user,
            request.pageSize,
            request.lastItem
        ))
    );
    return response;
};
