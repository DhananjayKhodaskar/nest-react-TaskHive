import { Request } from "express";
import { User } from "src/users/interfaces/user.interface";

export interface CustomRequest extends Request {
  user: User;
}
