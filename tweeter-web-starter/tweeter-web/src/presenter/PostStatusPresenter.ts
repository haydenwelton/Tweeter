import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { Presenter, View } from "./Presenter";

export interface PostStatusView extends View {
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
    setPost: (post: string) => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
    private _service: StatusService;

    public constructor(view: PostStatusView) {
        super(view);
        this._service = new StatusService();
    }

    public get service(): StatusService {
        return this._service;
    }

    public async submitPost(
        post: string,
        currentUser: User,
        authToken: AuthToken
    ) {
        this.view.displayInfoMessage("Posting status...", 0);
        this.doFailureReportingOperation(async () => {
            let status = new Status(post, currentUser!, Date.now());

            await this.service.postStatus(authToken!, status);

            this.view.clearLastInfoMessage();
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        }, "post the status");
    }
}
