import { GetUserRequest, GetUserResponse } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: GetUserRequest
): Promise<GetUserResponse> => {
    const request: GetUserRequest = GetUserRequest.fromJson(event);
    let response = new GetUserResponse(
        true,
        await new UserService(new DDBDAOFactory()).getUser(
            request.authToken,
            request.alias
        )
    );
    return response;
};
