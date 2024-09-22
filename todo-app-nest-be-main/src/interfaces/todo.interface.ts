import { Document } from 'mongoose';
export interface IToDo extends Document{
    readonly task: string;
    readonly completed: boolean;

}