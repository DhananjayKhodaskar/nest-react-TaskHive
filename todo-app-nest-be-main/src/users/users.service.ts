import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async createNewUser(newUser: CreateUserDto): Promise<User> {
    if (this.isValidEmail(newUser.email) && newUser.password) {
      var userRegistered = await this.findByEmail(newUser.email.toLowerCase());
      if (!userRegistered) {
        newUser.password = await bcrypt.hash(newUser.password, saltRounds);
        newUser.email = newUser.email.toLowerCase();
        var createdUser = new this.userModel(newUser);
        return await createdUser.save();
      } else {
        throw new HttpException(
          "User is already registered with this email.",
          HttpStatus.FORBIDDEN
        );
      }
    } else {
      throw new HttpException(
        "REGISTRATION.MISSING_MANDATORY_PARAMETERS",
        HttpStatus.FORBIDDEN
      );
    }
  }

  isValidEmail(email: string) {
    if (email) {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }
}
