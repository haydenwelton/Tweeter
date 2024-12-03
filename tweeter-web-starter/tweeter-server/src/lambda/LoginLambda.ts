import { AuthenticateResponse, LoginRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: LoginRequest
): Promise<AuthenticateResponse> => {
    let response = new AuthenticateResponse(
        true,
        ...(await new UserService(new DDBDAOFactory()).login(
            event.username,
            event.password
        ))
    );
    return response;
};
