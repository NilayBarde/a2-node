import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface FollowDaoI {
    findAllFollowing(uid: string): Promise<Follow[]>;
    findAllFollowers(uid: string): Promise<Follow[]>;
    userFollowsUser(uid: string, uidf: string): Promise<Follow>;
    userUnfollowsUser(uid: string, uidf: string): Promise<any>;
}
