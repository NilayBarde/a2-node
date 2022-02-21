import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    };
    private constructor() {}
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowing: uid })
            .populate("userFollowed")
            .exec();

    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowed: uid })
            .populate("userFollowing")
            .exec();

    userFollowsUser = async (uid: string, uidf: string): Promise<Follow> =>
        FollowModel.create({ userFollowed: uidf, userFollowing: uid });

    userUnfollowsUser = async (uid: string, uidf: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowed: uidf, userFollowing: uid });
}
