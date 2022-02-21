import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    };
    private constructor() {}

    findAllUsersBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ tuit: tid }).populate("bookmarkedBy").exec();

    findAllTuitsBookmarkedUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ bookmarkedBy: uid }).populate("tuit").exec();

    bookmarkTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ tuit: tid, bookmarkedBy: uid });

    unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ tuit: tid, bookmarkedBy: uid });

    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find()
            .populate("bookmarkedBy", { username: 1 })
            .populate("tuit")
            .exec();
}
