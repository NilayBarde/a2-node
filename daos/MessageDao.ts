/**
 * @file Implements DAO managing data storage of messages. Uses mongoose
 * MessageModel to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    };
    private constructor() {}

    /**
     * Uses MessageModel to retrieve all message documents that a particular user
     * has sent to other users from messages collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages are retrieved from database
     */
    findAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ from: uid }).populate("to").exec();

    /**
     * Uses MessageModel to retrieve all message documents that a particular user
     * has received from other users from messages collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when messages are retrieved from database
     */
    findAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel.find({ to: uid }).populate("from").exec();

    /**
     * Inserts message instance into the database,
     * representing a user sends a message to another user
     * @param {Message} message Message that was sent
     * @param {string} from Primary key of the user who sent the message
     * @param {string} to Primary key of the user who received the message
     * @returns Promise To be notified when message is inserted into the database
     */
    sendMessage = async (
        message: Message,
        from: string,
        to: string
    ): Promise<Message> => MessageModel.create({ ...message, from, to });

    /**
     * Removes message from the database
     * @param {string} mid Message's primary key
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid });

    /**
     * Uses MessageModel to retrieve all message documents from messages collection
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findAllMessages = async (): Promise<Message[]> =>
        MessageModel.find()
            .populate("to", { username: 1 })
            .populate("from", { username: 1 })
            .exec();

    /**
     * Uses MessageModel to retrieve all sent message documents from messages collection from one user sent a specific other user
     * @param {string} uid Primary key of the user who sent the message
     * @param {string} uidf Primary key of the user who received the message
     * @returns Promise To be notified when the messages are retrieved from the database
     */
    findSentMessagesUser = async (
        uid: string,
        uidf: string
    ): Promise<Message[]> =>
        MessageModel.find({ from: uid, to: uidf })
            .populate("from")
            .populate("to")
            .exec();

    /**
     * Uses MessageModel to retrieve all received message documents from messages collection from one user to another user
     * @param {string} uid Primary key of the user who sent the message
     * @param {string} uidf Primary key of the user who received the message
     * @returns Promise To be notified when the messages are retrieved from the database
     */

    findReceivedMessagesUser = async (
        uid: string,
        uidf: string
    ): Promise<Message[]> =>
        MessageModel.find({ from: uidf, to: uid })
            .populate("from")
            .populate("to")
            .exec();
}
