import mongoose from "mongoose";

export interface IJwtPayload {
    id: mongoose.Types.ObjectId;
    email: string;
    username: string;
    roles: string[];
}