import { Entity } from "./Entity";

export class UserEntity extends Entity {
    firstName: string;
    lastName: string;
    alias: string;
    imageUrl: string;
    password: string;
    numFollowers: number;
    numFollowees: number;

    public constructor(
        firstName: string,
        lastName: string,
        alias: string,
        imageUrl: string,
        password: string,
        numFollowers: number,
        numFollowees: number
    ) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.alias = alias;
        this.imageUrl = imageUrl;
        this.password = password;
        this.numFollowers = numFollowers;
        this.numFollowees = numFollowees;
    }
}
