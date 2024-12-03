import { AuthTokenEntity } from "../../entity/AuthTokenEntity";

//look into storing the user's handle with the authtoken
export interface AuthTokenDAO {
    authenticate(token: string): Promise<boolean>;
    getAuthTokenHandle(token: string): Promise<string>;
    recordAuthToken(authTokenEntity: AuthTokenEntity): Promise<void>;
    deleteAuthToken(token: string): Promise<void>;
}
