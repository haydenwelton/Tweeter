import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AuthTokenDAO } from "../interface/AuthTokenDAO";
import { DAOFactory } from "../interface/DAOFactory";
import { FeedDAO } from "../interface/FeedDAO";
import { FollowsDAO } from "../interface/FollowsDAO";
import { ImageDAO } from "../interface/ImageDAO";
import { StoryDAO } from "../interface/StoryDAO";
import { UsersDAO } from "../interface/UsersDAO";
import { DDBAuthTokenDAO } from "./DDBAuthTokenDAO";
import { DDBFeedDAO } from "./DDBFeedDAO";
import { DDBFollowsDAO } from "./DDBFollowsDAO";
import { DDBStoryDAO } from "./DDBStoryDAO";
import { DDBUsersDAO } from "./DDBUsersDAO";
import { S3ImageDAO } from "./S3ImageDAO";

export class DDBDAOFactory implements DAOFactory {
    protected readonly client = DynamoDBDocumentClient.from(
        new DynamoDBClient()
    );

    getAuthTokensDAO(): AuthTokenDAO {
        return new DDBAuthTokenDAO(this.client);
    }
    getFeedDAO(): FeedDAO {
        return new DDBFeedDAO(this.client);
    }
    getFollowsDAO(): FollowsDAO {
        return new DDBFollowsDAO(this.client);
    }
    getStoryDAO(): StoryDAO {
        return new DDBStoryDAO(this.client);
    }
    getUsersDAO(): UsersDAO {
        return new DDBUsersDAO(this.client);
    }
    getImageDAO(): ImageDAO {
        return new S3ImageDAO();
    }
}
