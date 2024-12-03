import { AuthToken, LoadMoreStatusItemsRequest, LoginRequest, PostStatusRequest, Status, User,} from "tweeter-shared";
import { PostStatusPresenter, PostStatusView,} from "../../../src/presenter/PostStatusPresenter";
import {
    anything,
    capture,
    instance,
    mock,
    spy,
    verify,
    when,
} from "ts-mockito";
import { StatusService } from "../../../src/model/service/StatusService";
import { ServerFacade } from "../../../src/model/net/ServerFacade";
import "isomorphic-fetch";

describe("PostStatus", () => {
    let mockPostStatusPresenterView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;

    const serverFacade: ServerFacade = new ServerFacade();
    let authToken: AuthToken;
    const user = new User(
        "firstName",
        "lastName",
        "@testUser",
        "https://cs340-hw-2024.s3.us-east-2.amazonaws.com/image/%40Rex"
    );
    const statusMessage = "BLAH: " + new Date().toString();

    beforeAll(async () => {
        //logging in a user to get authtoken
        const response = await serverFacade.login(
            new LoginRequest(user.alias, "password")
        );
        authToken = response.token;
    });

    beforeEach(() => {
        mockPostStatusPresenterView = mock<PostStatusView>();
        const mockPostStatusPresenterInstance = instance(
            mockPostStatusPresenterView
        );

        const postStatusPresenterSpy = spy(
            new PostStatusPresenter(mockPostStatusPresenterInstance)
        );
        postStatusPresenter = instance(postStatusPresenterSpy);

        // mockStatusService = mock<StatusService>();
        // const mockStatusServiceInstance = instance(mockStatusService);

        // when(postStatusPresenterSpy.service).thenReturn(
        //     mockStatusServiceInstance
        // );
    });

    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost(statusMessage, user, authToken);
        verify(
            mockPostStatusPresenterView.displayInfoMessage(
                "Posting status...",
                0
            )
        ).once();
    });

    it("posted the status and was appended to the user's story", async () => {
        function wait(milliseconds: number): Promise<void> {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve(); // Resolves the promise after the specified milliseconds
                }, milliseconds);
            });
        }
        await wait(1000);
        const response = await serverFacade.loadMoreStoryItems(
            new LoadMoreStatusItemsRequest(authToken, user, 1, null)
        );
        const statusPosted: Status = response.pageOfStatuses[0];
        expect(statusPosted.post).toEqual(statusMessage);
        expect(statusPosted.user).toEqual(user);
    });






// import { act, render, screen } from "@testing-library/react";
// import PostStatus from "../../../src/components/postStatus/PostStatus";
// import { MemoryRouter } from "react-router-dom";
// import React from "react";
// import userEvent from "@testing-library/user-event";
// import { AuthToken, User } from "tweeter-shared";
// import { instance, mock, verify } from "ts-mockito";
// import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";
// import useUserInfo from "../../../src/components/userInfo/UserInfoHook";
// import "@testing-library/jest-dom";

// jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
//     ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
//     __esModule: true,
//     default: jest.fn(),
// }));

// describe("PostStatus Component", () => {
//     let mockUser: User;
//     let mockAuthToken: AuthToken;

//     mockUser = mock<User>();
//     let mockUserInstance = instance(mockUser);

//     mockAuthToken = mock<AuthToken>();
//     let mockAuthTokenInstance = instance(mockAuthToken);

//     beforeAll(() => {
//         (useUserInfo as jest.Mock).mockReturnValue({
//             currentUser: mockUserInstance,
//             authToken: mockAuthTokenInstance,
//         });
//     });

//     it("starts with both Post Status and Clear buttons disabled", () => {
//         const { postStatusButton, clearStatusButton } =
//             renderPostStatusAndGetElements();
//         expect(postStatusButton).toBeDisabled();
//         expect(clearStatusButton).toBeDisabled();
//     });

//     it("enables both buttons when text field has text", async () => {
//         const { postStatusButton, clearStatusButton, postText, user } =
//             renderPostStatusAndGetElements();

//         await user.type(postText, "a");
//         expect(postStatusButton).toBeEnabled();
//         expect(clearStatusButton).toBeEnabled();
//     });

//     it("disabled both buttons when the text field is cleared", async () => {
//         const { postStatusButton, clearStatusButton, postText, user } =
//             renderPostStatusAndGetElements();

//         expect(postStatusButton).toBeDisabled();
//         expect(clearStatusButton).toBeDisabled();

//         await user.type(postText, "a");
//         expect(postStatusButton).toBeEnabled();
//         expect(clearStatusButton).toBeEnabled();

//         await user.clear(postText);
//         expect(postStatusButton).toBeDisabled();
//         expect(clearStatusButton).toBeDisabled();
//     });

//     it("calls the presenters postStatus method when the Post Status button is pressed", async () => {
//         const mockPresenter = mock<PostStatusPresenter>();
//         const mockPresenterInstance = instance(mockPresenter);
//         const post: string = "test";

//         const { postStatusButton, postText, user } =
//             renderPostStatusAndGetElements(mockPresenterInstance);

//         await user.type(postText, post);
//         await user.click(postStatusButton);
//         await act(async () => {        
//         verify(
//             mockPresenter.submitPost(
//                 post,
//                 mockUserInstance,
//                 mockAuthTokenInstance
//             )
//         ).once();
        
//     });
// });

// const renderPostStatus = (presenter?: PostStatusPresenter) => {
//     return render(
//         <MemoryRouter>
//             {!!presenter ? (
//                 <PostStatus presenter={presenter} />
//             ) : (
//                 <PostStatus />
//             )}
//         </MemoryRouter>
//     );
// };

// const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
//     const user = userEvent.setup();

//     renderPostStatus(presenter);

//     const postStatusButton = screen.getByRole("button", {
//         name: /Post Status/i,
//     });
//     const clearStatusButton = screen.getByRole("button", { name: /Clear/i });
//     const postText = screen.getByLabelText("post");

//     return { postStatusButton, clearStatusButton, postText, user };
// };
});