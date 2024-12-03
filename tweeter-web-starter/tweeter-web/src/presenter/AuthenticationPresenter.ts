import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model/service/UserService";

export interface AuthenticationView extends View {
    authenticated: (user: User, authToken: AuthToken) => void;
    navigateTo: (url: string) => void;
}

export abstract class AuthenticationPresenter<
    T extends AuthenticationView
> extends Presenter<T> {
    private _service: UserService;

    public constructor(view: T) {
        super(view);
        this._service = new UserService();
    }

    protected get service(): UserService {
        return this._service;
    }

    protected async doAuthentionOperation(
        getUserAuth: () => Promise<[User, AuthToken]>,
        navigation: () => Promise<void>,
        operationDescription: string
    ): Promise<void> {
        this.doFailureReportingOperation(async () => {
            let [user, authToken] = await getUserAuth();
            this.view.authenticated(user, authToken);
            navigation();
        }, operationDescription);
    }
}
