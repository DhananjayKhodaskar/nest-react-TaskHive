export class UserDto {
  constructor(object: any) {
    this.name = object.name;
    this.surname = object.surname;
    this.email = object.email;
    this.roles = object.roles;
  }
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly roles: string[];
}
