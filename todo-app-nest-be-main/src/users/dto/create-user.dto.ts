export class CreateUserDto {
  readonly name: string;
  readonly surname: string;
   email: string;
  password: string;
  readonly roles: string[];
}
