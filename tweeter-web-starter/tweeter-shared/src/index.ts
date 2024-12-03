export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";
export type { AuthTokenDto } from "./model/dto/AuthTokenDto";
export type { UserDto } from "./model/dto/UserDto";
export type { FollowDto } from "./model/dto/FollowDto";
export type { StatusDto } from "./model/dto/StatusDto";

// All classes that should be avaialble to other modules need to exported here. export * does not work when
// uploading to lambda. Instead we have to list each export.
export { FakeData } from "./util/FakeData";
export {
    LoginRequest,
    TweeterRequest,
    RegisterRequest,
    GetUserRequest,
    LoadMoreStatusItemsRequest,
    PostStatusRequest,
    LoadMoreUserItemsRequest,
    GetIsFollowerStatusRequest,
    FollowInfoRequest,
    LogoutRequest,
} from "./model/net/Request";
export {
    AuthenticateResponse,
    GetUserResponse,
    LoadMoreStatusItemsResponse,
    LoadMoreUserItemsResponse,
    GetIsFollowerStatusResponse,
    GetFollowCountResponse,
    GetFollowInfoResponse,
    TweeterResponse,
} from "./model/net/Response";
