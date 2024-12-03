import { LogoutRequest } from "tweeter-shared/dist/model/net/Request";
import { TweeterResponse } from "tweeter-shared/dist/model/net/Response";
import { UserService } from "../model/service/UserService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: LogoutRequest
): Promise<TweeterResponse> => {
    const request: LogoutRequest = LogoutRequest.fromJson(event);
    await new UserService(new DDBDAOFactory()).logout(request.token);
    let response = new TweeterResponse(true);
    return response;
};
