import * as bcrypt from "bcryptjs";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JWTService } from "./jwt.service";
import { Model } from "mongoose";
import { User } from "../users/interfaces/user.interface";
import { UserDto } from "../users/dto/user.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly jwtService: JWTService
  ) {}

  async validateLogin(email, password) {
    var userFromDb = await this.userModel.findOne({ email: email });
    if (!userFromDb)
      throw new HttpException("User Not Found.", HttpStatus.NOT_FOUND);

    var isValidPass = await bcrypt.compare(password, userFromDb.password);
    if (!isValidPass)
      throw new HttpException("Wrong password.", HttpStatus.NOT_ACCEPTABLE);

    if (isValidPass) {
      var accessToken = await this.jwtService.createToken(
        email,
        userFromDb.roles
      );

      var refreshToken = await this.jwtService.createRefreshToken(
        email,
        userFromDb.roles
      );

      userFromDb.auth.refreshToken = refreshToken;
      await userFromDb.save();

      return {
        token: accessToken,
        user: new UserDto(userFromDb),
        refreshToken: refreshToken,
      };
    } else {
      throw new HttpException("LOGIN.ERROR", HttpStatus.UNAUTHORIZED);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verifyRefreshToken(refreshToken);

      const userFromDb = await this.userModel.findOne({ email: decoded.email });

      if (!userFromDb || userFromDb.auth.refreshToken !== refreshToken) {
        throw new HttpException("TOKEN.INVALID", HttpStatus.UNAUTHORIZED);
      }

      const newAccessToken = await this.jwtService.createToken(
        userFromDb.email,
        userFromDb.roles
      );

      const newRefreshToken = await this.jwtService.createRefreshToken(
        userFromDb.email,
        userFromDb.roles
      );

      userFromDb.auth.refreshToken = newRefreshToken;
      await userFromDb.save();

      return {
        accessToken: newAccessToken.access_token,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new HttpException("TOKEN.INVALID_OR_EXPIRED", HttpStatus.FORBIDDEN);
    }
  }
}
