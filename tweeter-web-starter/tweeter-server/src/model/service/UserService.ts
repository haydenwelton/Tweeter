import { User, AuthToken } from "tweeter-shared";
import { DAOFactory } from "../dao/interface/DAOFactory";
import { UserEntity } from "../entity/UserEntity";
import { AuthTokenEntity } from "../entity/AuthTokenEntity";
import { Service } from "./Service";
import { FollowEntity } from "../entity/FollowEntity";

export class UserService extends Service {
    constructor(daoFactory: DAOFactory) {
        super(daoFactory);
    }

    public async getUser(
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        this.verfiyRequestData([authToken, alias]);
        this.authenticate(authToken.token);
        const userEntity: UserEntity | undefined = await this.usersDAO.getUser(
            alias
        );
        console.log(userEntity)
        this.verifyReturn(userEntity);
        return new User(
            userEntity!.firstName,
            userEntity!.lastName,
            userEntity!.alias,
            userEntity!.imageUrl
        );
    }

    public async login(
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        this.verfiyRequestData([alias, password]);

        const userEntity: UserEntity | undefined =
            await this.usersDAO.loginUser(alias, password);
        if (userEntity !== undefined) {
            return await this.returnUserToken(userEntity, alias);
        } else {
            throw new Error("[Forbidden Error] Invalid alias or password");
        }
    }

    public async register(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageStringBase64: string
    ): Promise<[User, AuthToken]> {
        this.verfiyRequestData([
            firstName,
            lastName,
            alias,
            password,
            imageStringBase64,
        ]);

        //converting image string to image url
        const imageUrl = await this.imageDAO.putImage(alias, imageStringBase64);

        const userEntity: UserEntity | undefined =
            await this.usersDAO.registerUser(
                firstName,
                lastName,
                alias,
                password,
                imageUrl
            );
        if (userEntity !== undefined) {
            return await this.returnUserToken(userEntity, alias);
        } else {
            throw new Error("[Forbidden Error] Invalid registration");
        }
    }

    public async logout(authToken: AuthToken): Promise<void> {
        await this.authTokenDAO.deleteAuthToken(authToken.token);
    }

    private async returnUserToken(
        userEntity: UserEntity,
        alias: string
    ): Promise<[User, AuthToken]> {
        //generate and store authToken
        const authToken: AuthToken = AuthToken.Generate();
        await this.authTokenDAO.recordAuthToken(
            new AuthTokenEntity(authToken.token, authToken.timestamp, alias)
        );

        //generating user from userEntity
        const user = new User(
            userEntity.firstName,
            userEntity.lastName,
            userEntity.alias,
            userEntity.imageUrl
        );

        return [user, authToken];
    }

    public async getIsFollowerStatus(
        authToken: AuthToken,
        user: User,
        selectedUser: User
    ): Promise<boolean> {
        this.verfiyRequestData([authToken, user, selectedUser]);
        this.authenticate(authToken.token);

        const follow = new FollowEntity(
            user.alias,
            user.firstName,
            selectedUser.alias,
            selectedUser.firstName
        );
        const result: FollowEntity | undefined =
            await this.followsDAO.getFollow(follow);

        if (result !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    public async getFolloweesCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        this.verfiyRequestData([authToken, user]);
        this.authenticate(authToken.token);

        const userEntity: UserEntity | undefined = await this.usersDAO.getUser(
            user.alias
        );
        this.verifyReturn(userEntity);
        return userEntity!.numFollowees;
    }

    public async getFollowersCount(
        authToken: AuthToken,
        user: User
    ): Promise<number> {
        this.verfiyRequestData([authToken, user]);
        this.authenticate(authToken.token);

        const userEntity: UserEntity | undefined = await this.usersDAO.getUser(
            user.alias
        );
        this.verifyReturn(userEntity);
        return userEntity!.numFollowers;
    }

    public async follow(
        authToken: AuthToken,
        userToFollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        return await this.updateFollow(
            authToken,
            userToFollow,
            true,
            1
        );
    }

    public async unfollow(
        authToken: AuthToken,
        userToUnfollow: User
    ): Promise<[followersCount: number, followeesCount: number]> {
        return await this.updateFollow(
            authToken,
            userToUnfollow,
            false,
            -1
        );
    }

    public async updateFollow(
        authToken: AuthToken,
        userToUpdate: User,
        followOrDelete: boolean,
        numIncrement: number
    ): Promise<[followersCount: number, followeesCount: number]> {
        this.verfiyRequestData([authToken, numIncrement]);
        this.authenticate(authToken.token);

        const userHandle = await this.authTokenDAO.getAuthTokenHandle(
            authToken.token
        );
        
        const userEntity: UserEntity | undefined = await this.usersDAO.getUser(
            userHandle
        );
        if (userEntity === undefined) {
            throw new Error("[Server Error] couldn't find user");
        }
        console.log(userEntity.alias)

        if (followOrDelete) {
            this.followsDAO.putFollow(         
                new FollowEntity(
                    userEntity.alias,
                    userEntity.firstName,
                    userToUpdate.alias,
                    userToUpdate.firstName
            ))
        } else if (followOrDelete == false) {
            this.followsDAO.deleteFollow(         
                new FollowEntity(
                    userEntity.alias,
                    userEntity.firstName,
                    userToUpdate.alias,
                    userToUpdate.firstName
            ))
            this.feedDAO
        }
        //need to update followers and following on this user and the
        //user that has just been unfollowed
        await this.usersDAO.updateNumFollowing(userEntity.alias, numIncrement);
        await this.usersDAO.updateNumFollowers(
            userToUpdate.alias,
            numIncrement
        );

        return [userEntity.numFollowers, userEntity.numFollowees];
    }
}
