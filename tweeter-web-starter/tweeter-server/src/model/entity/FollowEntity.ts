import { Entity } from "./Entity";

//TODO: consider removing the followername and followeename as they haven't been used yet
export class FollowEntity extends Entity {
    followerHandle: string;
    followerName: string;
    followeeHandle: string;
    followeeName: string;

    constructor(
        followerHandle: string,
        followerName: string,
        followeeHandle: string,
        followeeName: string
    ) {
        super();
        this.followerHandle = followerHandle;
        this.followerName = followerName;
        this.followeeHandle = followeeHandle;
        this.followeeName = followeeName;
    }

    toString(): string {
        return (
            "Follow{" +
            "follower handle='" +
            this.followerHandle +
            "'" +
            ", follower name='" +
            this.followerName +
            "'" +
            ", followee handle='" +
            this.followeeHandle +
            "'" +
            ", followee name='" +
            this.followeeName +
            "'}"
        );
    }
}
