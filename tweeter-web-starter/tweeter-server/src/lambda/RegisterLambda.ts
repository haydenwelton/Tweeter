import { AuthenticateResponse, RegisterRequest } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async (
    event: RegisterRequest
): Promise<AuthenticateResponse> => {
    let response = new AuthenticateResponse(
        true,
        ...(await new UserService(new DDBDAOFactory()).register(
            event.firstName,
            event.lastName,
            event.alias,
            event.password,
            event.imageStringBase64
        ))
    );
    return response;
};
