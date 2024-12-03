/**
 * should receive from the PostStatusQueue:
 * who posted and the actual status
 *
 * then:
 * find out how many followers there are
 * writes to the UpdateFeedQueue with the following:
 * - the status being posted
 * - who is the user that posted it
 * - 25 aliases (from the list of followers)
 *   ** note that 25 isn't the end all be all, it might need to be changed **
 */

import { Status } from "tweeter-shared";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";
import { StatusService } from "../model/service/StatusService";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const BATCH_SIZE = 100;

export const handler = async function (event: any) {
    for (let i = 0; i < event.Records.length; ++i) {
        const { body } = event.Records[i];
        const status = Status.fromJson(body);
        if (status === null) {
            throw new Error(
                "[Server Error] could not deserialize status from PostStatusQueue"
            );
        }
        const userHandle = status.user.alias;

        //getting list of followers
        const followers = await new StatusService(
            new DDBDAOFactory()
        ).getFollowers(userHandle);

        //splitting up list into groups of 25 to send to the UpdateFeedQueue
        let sqsClient = new SQSClient();
        const sqs_url =
            "https://sqs.us-east-2.amazonaws.com/319758587841/UpdateFeedQueue";

        for (let i = 0; i < followers.length; i += BATCH_SIZE) {
            const messageBody = JSON.stringify({
                Followers: followers.slice(i, i + BATCH_SIZE),
                Status: body,
            });

            const params = {
                MessageBody: messageBody,
                QueueUrl: sqs_url,
            };

            try {
                const data = await sqsClient.send(
                    new SendMessageCommand(params)
                );
                console.log(
                    "Success, batch ",
                    i,
                    " sent. MessageID:",
                    data.MessageId
                );
            } catch (err) {
                throw new Error(
                    "[Server Error] couldn't post status to followers feed do to: " +
                        err
                );
            }
        }
    }
    return null;
};
