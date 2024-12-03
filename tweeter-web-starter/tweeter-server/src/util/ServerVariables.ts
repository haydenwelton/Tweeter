export function getServerValue(key: string): string {
    switch (key) {
        case "USER_TABLE_NAME":
            return "users";
        case "USER_PRIMARY_KEY":
            return "handle";
        case "USER_FIRST_NAME":
            return "first_name";
        case "USER_LAST_NAME":
            return "last_name";
        case "USER_PASSWORD":
            return "password";
        case "USER_IMAGE_URL":
            return "image_url";
        case "USER_FOLLOWING_COUNT":
            return "num_followees";
        case "USER_FOLLOWERS_COUNT":
            return "num_followers";
        case "FOLLOW_TABLE_NAME":
            return "follows";
        case "FOLLOW_PRIMARY_KEY":
            return "follower_handle";
        case "FOLLOW_SORT_KEY":
            return "followee_handle";
        case "FOLLOWER_NAME":
            return "follower_name";
        case "FOLLOWEE_NAME":
            return "followee_name";
        default:
            throw new Error(`Unknown key: ${key}`);
    }
}
