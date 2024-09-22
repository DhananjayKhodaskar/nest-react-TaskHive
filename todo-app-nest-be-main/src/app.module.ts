import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ToDoSchema } from "src/schemas/todo.schema";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { config } from "dotenv";
config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: "ToDo", schema: ToDoSchema }]),
    UsersModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
