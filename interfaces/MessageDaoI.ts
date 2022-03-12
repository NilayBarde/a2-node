import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */

export default interface MessageDaoI {
    findAllMessagesSent(uid: string): Promise<Message[]>;
    findAllMessagesReceived(uid: string): Promise<Message[]>;
    findAllMessages(): Promise<Message[]>;
    sendMessage(message: Message, from: string, to: string): Promise<Message>;
    findSentMessagesUser(uid: string, uidf: string): Promise<Message[]>;
    findReceivedMessagesUser(uid: string, uidf: string): Promise<Message[]>;
    deleteMessage(mid: string): Promise<Message[]>;
}