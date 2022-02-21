/**
 * @file Controller RESTful Web service API for follows resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";
import Follow from "../models/follows/Follow";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the users that the user is following
 *     </li>
 *     <li>GET /api/users/follows/:uid to retrieve all users following this yser
 *     </li>
 *     <li>POST /api/users/:uid/follows/:uid to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid to record that a user
 *     no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get(
                "/api/users/:uid/follows",
                FollowController.followController.findAllFollowing
            );
            app.get(
                "/api/users/follows/:uid",
                FollowController.followController.findAllFollowers
            );
            app.post(
                "/api/users/:uid/follows/:uidf",
                FollowController.followController.userFollowsUser
            );
            app.delete(
                "/api/users/:uid/unfollows/:uidf",
                FollowController.followController.userUnfollowsUser
            );
        }
        return FollowController.followController;
    };

    private constructor() {}

    /**
     * Retrieves all users that a user is following from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user whose follow list is requested
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllFollowing(req.params.uid)
            .then((following: Follow[]) => res.json(following));

    /**
     * Retrieves all users that follow another user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user whose list of followers we want
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were followd
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao
            .findAllFollowers(req.params.uid)
            .then((followers: Follow[]) => res.json(followers));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uidf representing the user that is following the user
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userFollowsUser(req.params.uid, req.params.uidf)
            .then((follow: Follow) => res.json(follow));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uidf representing the user that is unfollowing
     * the uid and the uidf being unfollowd
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userUnfollowsUser(req.params.uid, req.params.uidf)
            .then((status) => res.send(status));
}
