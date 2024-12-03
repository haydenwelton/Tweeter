// import { ServerFacade } from "../../../src/model/net/ServerFacade";
// import {
//     RegisterRequest,
//     LoadMoreUserItemsRequest,
//     GetFollowCountResponse,
//     AuthenticateResponse,
//     AuthToken,
//     User,
//     LoadMoreUserItemsResponse,
//     FollowInfoRequest,
// } from "tweeter-shared";
// import "isomorphic-fetch";

// describe("ServerFacade", () => {
//     let serverFacade: ServerFacade = new ServerFacade();

//     it("should register a new user", async () => {
//         const request = new RegisterRequest(
//             "firstName",
//             "lastName",
//             "@testUser",
//             "password",
//             "imageStringBase64"
//         );

//         const result: AuthenticateResponse = await serverFacade.register(
//             request
//         );

//         //test to make sure that success is true
//         expect(result.success).toBe(true);

//         //test to make sure that the authtoken and user returned are not null (for now we can't test the values since it uses fakedata)
//         expect(result.token).not.toBeNull();
//         expect(result.user).not.toBeNull();
//     });

//     it("should return a page of users (followers)", async () => {
//         const request = new LoadMoreUserItemsRequest(
//             new AuthToken("token", 0),
//             new User("firstName", "lastName", "@testUser", "imageUrl"),
//             10,
//             null
//         );

//         const result: LoadMoreUserItemsResponse =
//             await serverFacade.loadMoreFollowers(request);

//         //test to make sure that success is true
//         expect(result.success).toBe(true);

//         //test to make sure users returned aren't null
//         expect(result.pageOfUsers).not.toBeNull();

//         //if there are more items, it should have returned 10 items back like requested
//         if (result.hasMoreItems === true) {
//             expect(result.pageOfUsers.length).toBe(10);

//             //checking to make sure it does in fact have more items to return if it says it does
//             const moreRequest = new LoadMoreUserItemsRequest(
//                 new AuthToken("token", 0),
//                 new User("firstName", "lastName", "@testUser", "imageUrl"),
//                 10,
//                 result.pageOfUsers.at(-1)!
//             );

//             const moreResult: LoadMoreUserItemsResponse =
//                 await serverFacade.loadMoreFollowers(request);

//             //test to make sure that success is true
//             expect(result.success).toBe(true);

//             //test to make sure users returned aren't null
//             expect(result.pageOfUsers).not.toBeNull();

//             //test to make sure at least one user is in the list
//             expect(moreResult.pageOfUsers.length).toBeGreaterThanOrEqual(1);
//         }
//     });

//     it("should return a followers count", async () => {
//         const request: FollowInfoRequest = new FollowInfoRequest(
//             new AuthToken("token", 0),
//             new User("firstName", "lastName", "@testUser", "imageUrl")
//         );

//         const result: GetFollowCountResponse =
//             await serverFacade.getFollowersCount(request);

//         expect(result.success).toBe(true);
//         expect(result.count).toBeGreaterThanOrEqual(0);
//     });
// });
