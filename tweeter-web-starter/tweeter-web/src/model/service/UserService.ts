import {
    AuthToken,
    User,
    LoginRequest,
    AuthenticateResponse,
    RegisterRequest,
    GetUserResponse,
    GetUserRequest,
    LogoutRequest,
} from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../net/ServerFacade";

export class UserService {
    private serverFacade = new ServerFacade();

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        let userResponse: GetUserResponse = await this.serverFacade.getUser(
            new GetUserRequest(authToken, alias)
        );
        return userResponse.user;
    }

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        let authResponse: AuthenticateResponse = await this.serverFacade.login(
            new LoginRequest(alias, password)
        );
        return [authResponse.user, authResponse.token];
    }

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array
    ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        let imageStringBase64: string =
            Buffer.from(userImageBytes).toString("base64");

        let authResponse: AuthenticateResponse =
            await this.serverFacade.register(
                new RegisterRequest(
                    firstName,
                    lastName,
                    alias,
                    password,
                    imageStringBase64
                )
            );

        return [authResponse.user, authResponse.token];
    }

    public async logout(authToken: AuthToken): Promise<void> {
        await this.serverFacade.logout(new LogoutRequest(authToken));
    }
}
