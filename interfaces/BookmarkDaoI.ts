import Bookmark from "../models/bookmarks/Bookmark";

export default interface BookmarkDaoI {
    bookmarkTuit(uid: string, tid: string): Promise<Bookmark>;
    unbookmarkTuit(uid: string, tid: string): Promise<any>;
    findAllTuitsBookmarkedUser(uid: string): Promise<Bookmark[]>;
    findAllUsersBookmarkedTuit(tid: string): Promise<Bookmark[]>;
    findAllBookmarks(): Promise<Bookmark[]>;
}
