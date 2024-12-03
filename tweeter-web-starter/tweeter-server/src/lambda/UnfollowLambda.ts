import { FollowInfoRequest, GetFollowInfoResponse } from "tweeter-shared";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";
import { UserService } from "../model/service/UserService";

export const handler = async (
    event: FollowInfoRequest
): Promise<GetFollowInfoResponse> => {
    const request: FollowInfoRequest = FollowInfoRequest.fromJson(event);
    let response = new GetFollowInfoResponse(
        true,
        ...(await new UserService(new DDBDAOFactory()).unfollow(
            request.authToken,
            request.user
        ))
    );
    return response;
};
