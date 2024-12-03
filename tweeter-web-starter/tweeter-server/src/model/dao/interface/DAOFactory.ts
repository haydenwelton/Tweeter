import { AuthTokenDAO } from "./AuthTokenDAO";
import { FeedDAO } from "./FeedDAO";
import { FollowsDAO } from "./FollowsDAO";
import { ImageDAO } from "./ImageDAO";
import { StoryDAO } from "./StoryDAO";
import { UsersDAO } from "./UsersDAO";

export interface DAOFactory {
    getAuthTokensDAO(): AuthTokenDAO;
    getFeedDAO(): FeedDAO;
    getFollowsDAO(): FollowsDAO;
    getStoryDAO(): StoryDAO;
    getUsersDAO(): UsersDAO;
    getImageDAO(): ImageDAO;
}
