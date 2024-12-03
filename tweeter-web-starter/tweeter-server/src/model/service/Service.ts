import { AuthTokenDAO } from "../dao/interface/AuthTokenDAO";
import { DAOFactory } from "../dao/interface/DAOFactory";
import { FeedDAO } from "../dao/interface/FeedDAO";
import { FollowsDAO } from "../dao/interface/FollowsDAO";
import { ImageDAO } from "../dao/interface/ImageDAO";
import { StoryDAO } from "../dao/interface/StoryDAO";
import { UsersDAO } from "../dao/interface/UsersDAO";

export class Service {
    protected authTokenDAO: AuthTokenDAO;
    protected storyDAO: StoryDAO;
    protected feedDAO: FeedDAO;
    protected usersDAO: UsersDAO;
    protected followsDAO: FollowsDAO;
    protected imageDAO: ImageDAO;

    constructor(daoFactory: DAOFactory) {
        this.authTokenDAO = daoFactory.getAuthTokensDAO();
        this.storyDAO = daoFactory.getStoryDAO();
        this.feedDAO = daoFactory.getFeedDAO();
        this.usersDAO = daoFactory.getUsersDAO();
        this.followsDAO = daoFactory.getFollowsDAO();
        this.imageDAO = daoFactory.getImageDAO();
    }

    verfiyRequestData(parameters: any[]) {
        parameters.forEach((element) => {
            if (element === null || element === undefined) {
                throw new Error(
                    "[Bad Request] part or all of the request is null"
                );
            }
        });
    }

    async authenticate(token: string): Promise<void> {
        const authenticated = await this.authTokenDAO.authenticate(token);
        if (authenticated === false) {
            throw new Error(
                "[Forbidden Error] authtoken either doesn't exist or is timed out"
            );
        }
    }

    verifyReturn(entity: any): void {
        if (entity == undefined || entity == null) {
            throw new Error("[Server Error] could not find entity in database");
        }
    }
}
