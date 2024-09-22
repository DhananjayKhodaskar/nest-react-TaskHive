import { Controller, Post, HttpStatus, HttpCode, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Login } from "./interfaces/login.interface";
import { ResponseSuccess, ResponseError } from "../common/dto/response.dto";
import { IResponse } from "../common/interfaces/response.interface";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post("email/login")
  @HttpCode(HttpStatus.OK)
  public async login(@Body() login: Login): Promise<IResponse> {
    try {
      var response = await this.authService.validateLogin(
        login.email.toLocaleLowerCase().trim(),
        login.password
      );
      return new ResponseSuccess("LOGIN.SUCCESS", response);
    } catch (error) {
      return new ResponseError("LOGIN.ERROR", error);
    }
  }

  @Post("email/register")
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    try {
      var newUser = new UserDto(
        await this.userService.createNewUser(createUserDto)
      );
      if (newUser) {
        return new ResponseSuccess("REGISTRATION.USER_REGISTERED_SUCCESSFULLY");
      } else {
        return new ResponseError("REGISTRATION.ERROR.SOMETHING_WENT_WRONG");
      }
    } catch (error) {
      return new ResponseError("REGISTRATION.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Body("refreshToken") refreshToken: string
  ): Promise<IResponse> {
    try {
      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);
      return new ResponseSuccess("REFRESH_TOKEN.SUCCESS", newAccessToken);
    } catch (error) {
      return new ResponseError("REFRESH_TOKEN.ERROR", error.message);
    }
  }
}
