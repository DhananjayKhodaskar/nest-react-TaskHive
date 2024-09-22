import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: String,
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
  surname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String }],
  auth: {
    refreshToken: { type: String },
  },
});
