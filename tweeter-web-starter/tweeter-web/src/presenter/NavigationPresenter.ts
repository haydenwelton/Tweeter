import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface NavigationView extends View {
    setDisplayedUser: (user: User) => void;
}

export class NavigationPresenter extends Presenter<NavigationView> {
    private service: UserService;

    public constructor(view: NavigationView) {
        super(view);
        this.service = new UserService();
    }

    public async loadUser(
        event: React.MouseEvent,
        authToken: AuthToken,
        currentUser: User
    ) {
        this.doFailureReportingOperation(async () => {
            let alias = this.extractAlias(event.target.toString());

            let user = await this.service.getUser(authToken!, alias);

            if (!!user) {
                if (currentUser!.equals(user)) {
                    this.view.setDisplayedUser(currentUser!);
                } else {
                    this.view.setDisplayedUser(user);
                }
            }
        }, "get user");
    }

    public extractAlias(value: string): string {
        let index = value.indexOf("@");
        return value.substring(index);
    }
}
