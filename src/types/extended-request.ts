import { Request } from "express";

export type ExtendedRequest = Request & {
    userID?: number;
}