import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateToDoDto, UpdateToDoDto } from "src/dto/todo.dto";
import { IToDo } from "src/interfaces/todo.interface";
import { Model } from "mongoose";

@Injectable()
export class AppService {
  constructor(@InjectModel("ToDo") private toDoModel: Model<IToDo>) {}

  async createToDo(createToDoDto: CreateToDoDto): Promise<IToDo> {
    try {
      const newToDo = new this.toDoModel(createToDoDto);
      const savedToDo = await newToDo.save();

      return savedToDo;
    } catch (error) {
      throw new HttpException(
        "TODO.CREATION_FAILED",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateToDo(
    toDoId: string,
    updateToDoDto: UpdateToDoDto
  ): Promise<IToDo> {
    try {
      const updatedToDo = await this.toDoModel.findByIdAndUpdate(
        toDoId,
        updateToDoDto,
        { new: true }
      );

      if (!updatedToDo) {
        throw new HttpException(`TODO.NOT_FOUND`, HttpStatus.NOT_FOUND);
      }

      return updatedToDo;
    } catch (error) {
      throw new HttpException(
        "TODO.UPDATE_FAILED",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllToDos(): Promise<IToDo[]> {
    try {
      const toDoData = await this.toDoModel.find();

      if (!toDoData || toDoData.length === 0) {
        return [];
      }

      return toDoData;
    } catch (error) {
      throw new HttpException(
        "TODO.FETCH_FAILED",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteToDo(toDoId: string): Promise<IToDo> {
    try {
      const deletedToDo = await this.toDoModel.findByIdAndDelete(toDoId);

      if (!deletedToDo) {
        throw new HttpException(`TODO.NOT_FOUND`, HttpStatus.NOT_FOUND);
      }

      return deletedToDo;
    } catch (error) {
      throw new HttpException(
        "TODO.DELETION_FAILED",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
