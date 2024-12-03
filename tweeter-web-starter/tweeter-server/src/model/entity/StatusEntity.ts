import { Entity } from "./Entity";

export class StatusEntity extends Entity {
    handle: string;
    time_stamp: number;
    statusJson: string;

    constructor(handle: string, time_stamp: number, statusJson: string) {
        super();
        this.handle = handle;
        this.time_stamp = time_stamp;
        this.statusJson = statusJson;
    }
}
