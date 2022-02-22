/**
 * @file Implements DAO managing data storage of follows. Uses mongoose
 * FollowModel to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    };
    private constructor() {}
    /**
     * Uses FollowModel to retrieve follow documents that all others users
     * a particular user is following from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when follows are retrieved from the database
     */

    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowing: uid })
            .populate("userFollowed")
            .exec();

    /**
     * Uses FollowModel to retrieve follow documents that all followers of a particular user
     * from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when follows are retrieved from the database
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowed: uid })
            .populate("userFollowing")
            .exec();

    /**
     * Inserts follow instance into the database,
     * representing a user follows another user
     * @param {string} uid Primary key of user following another user
     * @param {string} uidf Primary key of user followed by another user
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async (uid: string, uidf: string): Promise<Follow> =>
        FollowModel.create({ userFollowed: uidf, userFollowing: uid });

    /**
     * Removes follow from the database,
     * representing a user unfollows another user
     * @param {string} uid Primary key of user unfollowing another user
     * @param {string} auid Primary key of user is unfollowed by another user
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsUser = async (uid: string, uidf: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowed: uidf, userFollowing: uid });
}
