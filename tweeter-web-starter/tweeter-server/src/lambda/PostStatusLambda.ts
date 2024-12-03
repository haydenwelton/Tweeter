import { PostStatusRequest } from "tweeter-shared";
import { TweeterResponse } from "tweeter-shared/dist/model/net/Response";
import { StatusService } from "../model/service/StatusService";
import { DDBDAOFactory } from "../model/dao/DynamoDB/DDBDAOFactory";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export const handler = async (
    event: PostStatusRequest
): Promise<TweeterResponse> => {
    const request: PostStatusRequest = PostStatusRequest.fromJson(event);
    await new StatusService(new DDBDAOFactory()).postStatus(
        request.authToken,
        request.newStatus
    );
    let response = new TweeterResponse(true);

    //sending request to PostStatusQueue to process the feed
    let sqsClient = new SQSClient();
    const sqs_url =
        "https://sqs.us-east-2.amazonaws.com/319758587841/PostStatusQueue";
    const messageBody = request.newStatus.toJson();

    const params = {
        MessageBody: messageBody,
        QueueUrl: sqs_url,
    };

    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        console.log("Success, message sent. MessageID:", data.MessageId);
    } catch (err) {
        throw new Error(
            "[Server Error] couldn't post status to followers feed do to: " +
                err
        );
    }

    return response;
};
