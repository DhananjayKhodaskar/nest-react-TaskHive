import { Document } from "mongoose";

export interface User extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  roles: string[];
  auth: {
    refreshToken: string;
  };
}
