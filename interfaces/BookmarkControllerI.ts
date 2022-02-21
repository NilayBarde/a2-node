import { Request, Response } from "express";

export default interface BookmarkControllerI {
    bookmarkTuit(req: Request, res: Response): void;
    unbookmarkTuit(req: Request, res: Response): void;
    findAllTuitsBookmarkedUser(req: Request, res: Response): void;
    findAllUsersBookmarkedTuit(req: Request, res: Response): void;
    findAllBookmarks(req: Request, res: Response): void;
}
