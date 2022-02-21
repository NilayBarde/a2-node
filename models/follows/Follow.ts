/**
 * @file Declares Like data type representing relationship between
 * users and users, as in user folows another user
 */
import User from "../users/User";

/**
 * @typedef User Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User following user
 */

export default interface Follow {
    userFollowed: User;
    userFollowing: User;
}
