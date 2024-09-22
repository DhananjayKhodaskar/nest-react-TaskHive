import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./passport/jwt.strategy";
import { AuthController } from "./auth.controller";
import { UserSchema } from "../users/schemas/user.schema";
import { UsersService } from "../users/users.service";
import { JWTService } from "./jwt.service";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerMiddleware } from "../common/middlewares/logger.middleware";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JWTService, JwtStrategy],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
