import {
    FollowInfoRequest,
    GetFollowCountResponse,
} from "tweeter-shared";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";
import { UserService } from "../model/service/UserService";

export const handler = async (
    event: FollowInfoRequest
): Promise<GetFollowCountResponse> => {
    try {
        const request: FollowInfoRequest = FollowInfoRequest.fromJson(event);
        if (!request.authToken) {
            throw new Error("[Bad Request]");
        }
        if (!request.user) {
            throw new Error("[Bad Request]");
        }
        let response = new GetFollowCountResponse(
            true,
            await new UserService(new DDBDAOFactory()).getFolloweesCount(
                request.authToken,
                request.user
            )
        );
        return response;
    } catch (error) {
        throw new Error("[Server Error]" + error);
    }
};
