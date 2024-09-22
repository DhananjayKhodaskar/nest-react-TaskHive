import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateToDoDto, UpdateToDoDto } from "src/dto/todo.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./common/guards/roles.guard";
import { Roles } from "./common/decorators/roles.decorator";
import { ResponseError, ResponseSuccess } from "./common/dto/response.dto";
import { IResponse } from "./common/interfaces/response.interface";

@Controller()
@UseGuards(AuthGuard("jwt"))
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles("Admin")
  async createToDo(@Body() createToDoDto: CreateToDoDto): Promise<IResponse> {
    try {
      const newToDo = await this.appService.createToDo(createToDoDto);
      return new ResponseSuccess("TODO.CREATED_SUCCESSFULLY", newToDo);
    } catch (err) {
      return new ResponseError("TODO.ERROR.NOT_CREATED", err.message);
    }
  }

  @Put("/:id")
  @UseGuards(RolesGuard)
  @Roles("Admin")
  async updateToDo(
    @Param("id") toDoId: string,
    @Body() updateToDoDto: UpdateToDoDto
  ): Promise<IResponse> {
    try {
      const existingToDo = await this.appService.updateToDo(
        toDoId,
        updateToDoDto
      );
      return new ResponseSuccess("TODO.UPDATED_SUCCESSFULLY", existingToDo);
    } catch (err) {
      return new ResponseError("TODO.ERROR.NOT_UPDATED", err.message);
    }
  }

  @Get()
  async getToDos(): Promise<IResponse> {
    try {
      const toDoData = await this.appService.getAllToDos();
      return new ResponseSuccess("TODO.FETCH_SUCCESS", toDoData);
    } catch (err) {
      return new ResponseError("TODO.ERROR.FETCH_FAILED", err.message);
    }
  }

  @Delete("/:id")
  @UseGuards(RolesGuard)
  @Roles("Admin")
  async deleteToDo(@Param("id") toDoId: string): Promise<IResponse> {
    try {
      const deletedToDo = await this.appService.deleteToDo(toDoId);
      return new ResponseSuccess("TODO.DELETED_SUCCESSFULLY", deletedToDo);
    } catch (err) {
      return new ResponseError("TODO.ERROR.NOT_DELETED", err.message);
    }
  }
}
