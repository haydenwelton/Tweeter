import { Entity } from "./Entity";

export class AuthTokenEntity extends Entity {
    token: string;
    time_stamp: number;
    userHandle: string;

    constructor(token: string, timestamp: number, userHandle: string) {
        super();
        this.token = token;
        this.time_stamp = timestamp;
        this.userHandle = userHandle;
    }
}
