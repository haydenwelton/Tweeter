import { TweeterRequest } from "tweeter-shared";

export class ClientCommunicator {
    private SERVER_URL: string;
    constructor(SERVER_URL: string) {
        this.SERVER_URL = SERVER_URL;
    }

    async doPost<T extends TweeterRequest>(
        req: T,
        endpoint: string
    ): Promise<JSON> {
        const url = this.SERVER_URL + endpoint;
        const request = {
            method: "post",
            headers: new Headers({
                "Content-type":
                    "application/x-www-form-urlencoded; charset=UTF-8",
            }),
            body: JSON.stringify(req),
        };
        console.log(req)
        console.log(request.body)

        try {
            const resp: Response = await fetch(url, request);
            if (resp.ok) {
                const response: JSON = await resp.json();
                return response;
            } else {
                const error = await resp.json();
                throw new Error(error.errorMessage);
            }
        } catch (err) {
            throw new Error(
                "Client communicator doPost failed:\n" + (err as Error).message
            );
        }
    }
}
