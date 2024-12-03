import {
    AuthenticationPresenter,
    AuthenticationView,
} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<AuthenticationView> {
    public async doLogin(
        alias: string,
        password: string,
        originalUrl: string | undefined
    ) {
        this.doAuthentionOperation(
            async () => {
                return this.service.login(alias, password);
            },
            async () => {
                if (!!originalUrl) {
                    this.view.navigateTo(originalUrl);
                } else {
                    this.view.navigateTo("/");
                }
            },
            "log user in"
        );
    }
}
