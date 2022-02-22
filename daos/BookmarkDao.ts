/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose
 * BookmarkModel to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    };
    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all bookmark documents for a tuit from
     * bookmarks collection and then populate user documents from users collection.
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmarks are retrieved from database
     */
    findAllUsersBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ tuit: tid }).populate("bookmarkedBy").exec();

    /**
     * Uses BookmarkModel to retrieve all bookmark documents for a particular user from
     * bookmarks collection and then populate tuit documents from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmarks are retrieved from database
     */
    findAllTuitsBookmarkedUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ bookmarkedBy: uid }).populate("tuit").exec();

    /**
     * Inserts bookmark instance into the database
     * representing a user bookmarks a tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    bookmarkTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ tuit: tid, bookmarkedBy: uid });

    /**
     * Removes bookmark from the database
     * representing a user unbookmarks a tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ tuit: tid, bookmarkedBy: uid });

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from the database
     */
    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find()
            .populate("bookmarkedBy", { username: 1 })
            .populate("tuit")
            .exec();
}
