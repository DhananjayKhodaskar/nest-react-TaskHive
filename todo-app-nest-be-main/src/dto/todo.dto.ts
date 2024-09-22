import { IsBoolean, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
export class CreateToDoDto {
    @IsString()
    @IsNotEmpty()
    readonly task: string;
    
    @IsBoolean()
    @IsNotEmpty()
    readonly completed: boolean;
}

export class UpdateToDoDto extends PartialType(CreateToDoDto) {}