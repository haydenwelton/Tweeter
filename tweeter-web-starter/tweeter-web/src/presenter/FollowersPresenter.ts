import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";

export class FollowersPresenter extends UserItemPresenter {
    protected async getMoreItems(
        authToken: AuthToken,
        user: User
    ): Promise<[User[], boolean]> {
        return this.service.loadMoreFollowers(
            authToken,
            user,
            PAGE_SIZE,
            this.lastItem
        );
    }
    protected getItemDescription(): string {
        return "load follower items";
    }
}
