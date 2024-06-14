import mongoose from "mongoose";

export interface IUser {
  id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  roles: string[];
}
