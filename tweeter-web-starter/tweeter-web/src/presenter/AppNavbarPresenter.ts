import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavBarView extends MessageView {
    navigateToLogin: () => void;
}

export class AppNavbarPresenter extends Presenter<AppNavBarView> {
    private _service: UserService;

    public constructor(view: AppNavBarView) {
        super(view);
        this._service = new UserService();
    }

    public get service(): UserService {
        return this._service;
    }

    public async logOut(authToken: AuthToken) {
        this.view.displayInfoMessage("Logging Out...", 0);
        this.doFailureReportingOperation(async () => {
            await this.service.logout(authToken!);
            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
            this.view.navigateToLogin();
        }, "log user out");
    }
}
