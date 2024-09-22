import * as jwt from "jsonwebtoken";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../users/interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { config } from "dotenv";
config();

@Injectable()
export class JWTService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async createToken(email, roles) {
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRATION,
      secretOrKey = process.env.ACCESS_TOKEN_SECRET;
    const userInfo = { email: email, roles: roles };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async createRefreshToken(email: string, roles: string[]) {
    const refreshTokenExpiresIn = process.env.REFRESH_TOKEN_EXPIRATION;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    const userInfo = { email: email, roles: roles };

    const refreshToken = jwt.sign(userInfo, refreshTokenSecret, {
      expiresIn: refreshTokenExpiresIn,
    });
    return refreshToken;
  }

  async validateUser(signedUser): Promise<User> {
    var userFromDb = await this.userModel.findOne({ email: signedUser.email });
    if (userFromDb) {
      return userFromDb;
    }
    return null;
  }

  async verifyRefreshToken(refreshToken: string): Promise<any> {
    try {
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
      const decoded = jwt.verify(refreshToken, refreshTokenSecret);
      return decoded;
    } catch (err) {
      throw new Error("Invalid or expired refresh token");
    }
  }
}
