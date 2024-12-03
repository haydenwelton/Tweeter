import { User } from "../domain/User";

export interface FollowDto {
    readonly follower: User;
    readonly followee: User;
}
