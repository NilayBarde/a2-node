import { Request, Response } from "express";

export default interface MessageControllerI {
    findAllMessagesSent(req: Request, res: Response): void;
    findAllMessagesReceived(req: Request, res: Response): void;
    findAllMessages(req: Request, res: Response): void;
    sendMessage(req: Request, res: Response): void;
    findSentMessagesUser(req: Request, res: Response): void;
    findReceivedMessagesUser(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
}
