import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Param,
  Req,
} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { IResponse } from "../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../common/dto/response.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { CustomRequest } from "src/common/interfaces/customRequest";

@Controller("users")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user")
  @UseGuards(RolesGuard)
  async findById(@Req() req: CustomRequest): Promise<IResponse> {
    try {
      var user = await this.usersService.findByEmail(
        req.user.email.toLowerCase()
      );
      return new ResponseSuccess("COMMON.SUCCESS", new UserDto(user));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }
}
