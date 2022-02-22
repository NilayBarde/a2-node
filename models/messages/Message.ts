/**
 * @file Declares Like data type representing relationship between
 * users and user, as in user messages a user
 */
import User from "../users/User";

/**
 * @typedef Like Represents message relationship between a user and a user,
 * as in a user messages another user
 * @property {String} message Message being sent
 * @property {User} to User who received message
 * @property {User} from User who sent message
 * @property {Date} sentOn Message date sent
 */

export default interface Message {
    message: String;
    to: User;
    from: User;
    sentOn: Date;
}
