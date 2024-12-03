import {
    LoadMoreUserItemsRequest,
    LoadMoreUserItemsResponse,
} from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: LoadMoreUserItemsRequest
): Promise<LoadMoreUserItemsResponse> => {
    try {
        const request: LoadMoreUserItemsRequest =
            LoadMoreUserItemsRequest.fromJson(event);
        let response = new LoadMoreUserItemsResponse(
            true,
            ...(await new FollowService(new DDBDAOFactory()).loadMoreFollowees(
                request.authToken,
                request.user,
                request.pageSize,
                request.lastItem
            ))
        );
        return response;
    } catch (error) {
        throw new Error("[Bad Request] " + error);
    }
};
