import { FollowInfoRequest, GetFollowCountResponse } from "tweeter-shared";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";
import { UserService } from "../model/service/UserService";

export const handler = async (
    event: FollowInfoRequest
): Promise<GetFollowCountResponse> => {
    const request: FollowInfoRequest = FollowInfoRequest.fromJson(event);
    let response = new GetFollowCountResponse(
        true,
        await new UserService(new DDBDAOFactory()).getFollowersCount(
            request.authToken,
            request.user
        )
    );
    return response;
};
