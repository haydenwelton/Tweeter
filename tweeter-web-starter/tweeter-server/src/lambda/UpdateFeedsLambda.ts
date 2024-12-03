/**
 *  gets the following from the UpdateFeedQueue:
 * - the status being posted
 * - who is the user that posted it
 * - 25 aliases (from the list of followers)
 *
 * just needs to update the feed for the list of aliases
 */

import { Status } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";

export const handler = async function (event: any) {
    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];

        const dataReviver = (key: string, value: string) => {
            if (key === "Status") {
                return Status.fromJson(value);
            } else {
                return value;
            }
        };

        const request = JSON.parse(body, dataReviver);

        if (request === undefined) {
            throw new Error(
                "[Server Error] couldn't parse request in updateFeeds Lambda"
            );
        }

        const followerHandles = request.Followers;
        const status = request.Status;

        await new StatusService(new DDBDAOFactory()).postToFeeds(
            followerHandles,
            status
        );
    }
};
