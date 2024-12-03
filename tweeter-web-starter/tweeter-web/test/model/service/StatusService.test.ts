// import "@testing-library/jest-dom";
// import "isomorphic-fetch";
// import { StatusService } from "../../../src/model/service/StatusService";
// import { AuthToken, Status, User } from "tweeter-shared";

// describe("StatusService", () => {
//     const statusService: StatusService = new StatusService();

//     it("should return a user's story pages", async () => {
//         let result: [Status[], boolean] =
//             await statusService.loadMoreStoryItems(
//                 new AuthToken("token", 0),
//                 new User("firstName", "lastName", "@testUser", "imageUrl"),
//                 10,
//                 null
//             );

//         // testing to make sure the page of statuses and the hasMoreItems are not null
//         expect(result).not.toBeNull();

//         const pageOfStatuses: Status[] = result[0];
//         const hasMoreItems: boolean = result[1];

//         expect(pageOfStatuses).not.toBeNull();
//         expect(hasMoreItems).not.toBeNull();

//         //if there are more items, it should have returned 10 items back like requested
//         if (hasMoreItems === true) {
//             expect(pageOfStatuses.length).toBe(10);

//             //checking to make sure it does in fact have more items to return
//             let moreResults: [Status[], boolean] =
//                 await statusService.loadMoreStoryItems(
//                     new AuthToken("token", 0),
//                     new User("firstName", "lastName", "@testUser", "imageUrl"),
//                     10,
//                     pageOfStatuses.at(-1)!
//                 );

//             const pageOfMoreStatuses: Status[] = moreResults[0];

//             //test to make sure users returned aren't null
//             expect(pageOfMoreStatuses).not.toBeNull();

//             //test to make sure at least one user is in the list
//             expect(pageOfMoreStatuses.length).toBeGreaterThanOrEqual(1);
//         }
//     });
// });
