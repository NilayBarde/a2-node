/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the bookmarking HTTP endpoints:
 * <ul>
 *     <li>GET /api/user/:uid/bookmarks to retrieve all tuits bookmarked by a user
 *     </li>
 *     <li>GET /api/user/:tid/bookmarks to retrieve all users that bookmarked a tuit
 *     </li>
 *     <li>GET /api/bookmarks to retrieve all the bookmark documents for testing purpose
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:tid to record that a user no longer
 *     bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.get(
                "/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.findAllTuitsBookmarkedUser
            );
            app.get(
                "/api/tuits/:tid/bookmarks",
                BookmarkController.bookmarkController.findAllUsersBookmarkedTuit
            );
            app.get(
                "/api/bookmarks",
                BookmarkController.bookmarkController.findAllBookmarks
            );
            app.post(
                "/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.bookmarkTuit
            );
            app.delete(
                "/api/users/:uid/unbookmark/:tid",
                BookmarkController.bookmarkController.unbookmarkTuit
            );
        }
        return BookmarkController.bookmarkController;
    };

    private constructor() {}

    /**
     * Retrieves all tuits that bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllTuitsBookmarkedUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .findAllTuitsBookmarkedUser(req.params.uid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req Represents request from client, including path
     * parameter tid representing the bookmarked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .findAllUsersBookmarkedTuit(req.params.tid)
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uidf representing the user that is bookmarking the user
     * and the user being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmarks that was inserted in the
     * database
     */
    bookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .bookmarkTuit(req.params.uid, req.params.tid)
            .then((bookmark: Bookmark) => res.json(bookmark));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uidf representing the user that is unbookmarking
     * the uid and the uidf being unbookmarkd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    unbookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .unbookmarkTuit(req.params.uid, req.params.tid)
            .then((status) => res.send(status));

    /**
     * Retrieves all bookmarks from the database and returns an array of bookmarks (including
     * all tuits being bookmarked and users bookmarking the tuit)
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects (including all
     * tuits being bookmarked and users bookmarking the tuit)
     */
    findAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao
            .findAllBookmarks()
            .then((bookmarks: Bookmark[]) => res.json(bookmarks));
}
