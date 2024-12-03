import {
    GetIsFollowerStatusRequest,
    GetIsFollowerStatusResponse,
} from "tweeter-shared";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";
import { UserService } from "../model/service/UserService";

export const handler = async (
    event: GetIsFollowerStatusRequest
): Promise<GetIsFollowerStatusResponse> => {
    const request: GetIsFollowerStatusRequest =
        GetIsFollowerStatusRequest.fromJson(event);
    let response = new GetIsFollowerStatusResponse(
        true,
        await new UserService(new DDBDAOFactory()).getIsFollowerStatus(
            request.authToken,
            request.user,
            request.selectedUser
        )
    );
    return response;
};
