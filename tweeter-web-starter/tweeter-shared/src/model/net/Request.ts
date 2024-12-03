import { AuthToken } from "../domain/AuthToken";
import { Status } from "../domain/Status";
import { User } from "../domain/User";

export class TweeterRequest {}


export class GetUserRequest extends TweeterRequest {
    authToken: AuthToken;
    alias: string;

    constructor(authToken: AuthToken, alias: string) {
        super();
        this.authToken = authToken;
        this.alias = alias;
    }

    static fromJson(request: GetUserRequest): GetUserRequest {
        interface GetUserRequestJson {
            authToken: JSON;
            alias: string;
        }

        const jsonObject: GetUserRequestJson =
            request as unknown as GetUserRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.authToken)
        );
        if (deserializedToken === null) {
            throw new Error(
                "GetUserRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.authToken)
            );
        }

        return new GetUserRequest(deserializedToken, jsonObject.alias);
    }
}

export class LoginRequest extends TweeterRequest {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        super();
        this.username = username;
        this.password = password;
    }
}

export class RegisterRequest extends TweeterRequest {
    firstName: string;
    lastName: string;
    alias: string;
    password: string;
    imageStringBase64: string;

    constructor(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageStringBase64: string
    ) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.alias = alias;
        this.password = password;
        this.imageStringBase64 = imageStringBase64;
    }
}

export class LogoutRequest extends TweeterRequest {
    token: AuthToken;

    constructor(token: AuthToken) {
        super();
        this.token = token;
    }

    static fromJson(request: LogoutRequest): LogoutRequest {
        interface LogoutRequestJson {
            token: JSON;
        }

        const jsonObject: LogoutRequestJson =
            request as unknown as LogoutRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.token)
        );
        if (deserializedToken === null) {
            throw new Error(
                "LogoutRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.token)
            );
        }

        return new LogoutRequest(deserializedToken);
    }
}



export class LoadMoreStatusItemsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: Status | null;

    constructor(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: Status | null
    ) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }

    static fromJson(
        request: LoadMoreStatusItemsRequest
    ): LoadMoreStatusItemsRequest {
        interface LoadMoreStatusItemsRequestJson {
            authToken: JSON;
            user: JSON;
            pageSize: number;
            lastItem: JSON;
        }

        const jsonObject: LoadMoreStatusItemsRequestJson =
            request as unknown as LoadMoreStatusItemsRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.authToken)
        );
        if (deserializedToken === null) {
            throw new Error(
                "LoadMoreStatusItemsRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.authToken)
            );
        }

        const deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));

        if (deserializedUser === null) {
            throw new Error(
                "LoadMoreStatusItemsRequest, could not deserialize user with json:\n" +
                    JSON.stringify(jsonObject.user)
            );
        }
        let deserializedlastItem = null;
        try {
            deserializedlastItem = Status.fromJson(
                JSON.stringify(jsonObject.lastItem)
            );
        } catch (error) {
            console.log(
                "lastItem was likely null and couldn't be deserialiazed. Error: " +
                    error
            );
            deserializedlastItem = null;
        }

        return new LoadMoreStatusItemsRequest(
            deserializedToken,
            deserializedUser,
            jsonObject.pageSize,
            deserializedlastItem
        );
    }
}

export class PostStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    newStatus: Status;

    constructor(authToken: AuthToken, newStatus: Status) {
        super();
        this.authToken = authToken;
        this.newStatus = newStatus;
    }

    static fromJson(request: PostStatusRequest): PostStatusRequest {
        interface PostStatusRequestJson {
            authToken: JSON;
            newStatus: JSON;
        }

        const jsonObject: PostStatusRequestJson =
            request as unknown as PostStatusRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.authToken)
        );
        if (deserializedToken === null) {
            throw new Error(
                "PostStatusRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.authToken)
            );
        }

        const deserializedStatus = Status.fromJson(
            JSON.stringify(jsonObject.newStatus)
        );

        if (deserializedStatus === null) {
            throw new Error(
                "PostStatusRequest, could not deserialize user with json:\n" +
                    JSON.stringify(jsonObject.newStatus)
            );
        }

        return new PostStatusRequest(deserializedToken, deserializedStatus);
    }
}


export class LoadMoreUserItemsRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    pageSize: number;
    lastItem: User | null;

    constructor(
        authToken: AuthToken,
        user: User,
        pageSize: number,
        lastItem: User | null
    ) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.pageSize = pageSize;
        this.lastItem = lastItem;
    }

    static fromJson(
        request: LoadMoreUserItemsRequest
    ): LoadMoreUserItemsRequest {
        interface LoadMoreUserItemsRequestJson {
            authToken: JSON;
            user: JSON;
            pageSize: number;
            lastItem: JSON;
        }

        const jsonObject: LoadMoreUserItemsRequestJson =
            request as unknown as LoadMoreUserItemsRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.authToken)
        );
        if (deserializedToken === null) {
            throw new Error(
                "LoadMoreUserItemsRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.authToken)
            );
        }

        const deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));

        if (deserializedUser === null) {
            throw new Error(
                "LoadMoreUserItemsRequest, could not deserialize user with json:\n" +
                    JSON.stringify(jsonObject.user)
            );
        }
        let deserializedlastItem = null;

        if (jsonObject.lastItem !== null) {
            deserializedlastItem = User.fromJson(
                JSON.stringify(jsonObject.lastItem)
            );
        }

        return new LoadMoreUserItemsRequest(
            deserializedToken,
            deserializedUser,
            jsonObject.pageSize,
            deserializedlastItem
        );
    }
}

export class GetIsFollowerStatusRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;
    selectedUser: User;

    constructor(authToken: AuthToken, user: User, selectedUser: User) {
        super();
        this.authToken = authToken;
        this.user = user;
        this.selectedUser = selectedUser;
    }

    static fromJson(
        request: GetIsFollowerStatusRequest
    ): GetIsFollowerStatusRequest {
        interface GetIsFollowerStatusRequestJson {
            authToken: JSON;
            user: JSON;
            selectedUser: JSON;
        }

        const jsonObject: GetIsFollowerStatusRequestJson =
            request as unknown as GetIsFollowerStatusRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.authToken)
        );
        if (deserializedToken === null) {
            throw new Error(
                "GetIsFollowerStatusRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.authToken)
            );
        }

        const deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));

        if (deserializedUser === null) {
            throw new Error(
                "GetIsFollowerStatusRequest, could not deserialize user with json:\n" +
                    JSON.stringify(jsonObject.user)
            );
        }
        const deserializedSelectedUser = User.fromJson(
            JSON.stringify(jsonObject.selectedUser)
        );

        if (deserializedSelectedUser === null) {
            throw new Error(
                "GetIsFollowerStatusRequest, could not deserialize user with json:\n" +
                    JSON.stringify(jsonObject.selectedUser)
            );
        }

        return new GetIsFollowerStatusRequest(
            deserializedToken,
            deserializedUser,
            deserializedSelectedUser
        );
    }
}

export class FollowInfoRequest extends TweeterRequest {
    authToken: AuthToken;
    user: User;

    constructor(authToken: AuthToken, user: User) {
        super();
        this.authToken = authToken;
        this.user = user;
    }

    static fromJson(request: FollowInfoRequest): FollowInfoRequest {
        interface FollowInfoRequestJson {
            authToken: JSON;
            user: JSON;
        }

        const jsonObject: FollowInfoRequestJson =
            request as unknown as FollowInfoRequestJson;

        const deserializedToken: AuthToken | null = AuthToken.fromJson(
            JSON.stringify(jsonObject.authToken)
        );
        if (deserializedToken === null) {
            throw new Error(
                "FollowInfoRequest, could not deserialize authToken with json:\n" +
                    JSON.stringify(jsonObject.authToken)
            );
        }

        const deserializedUser = User.fromJson(JSON.stringify(jsonObject.user));

        if (deserializedUser === null) {
            throw new Error(
                "FollowInfoRequest, could not deserialize user with json:\n" +
                    JSON.stringify(jsonObject.user)
            );
        }

        return new FollowInfoRequest(deserializedToken, deserializedUser);
    }
}
