export class ProfileDto {
  constructor(object: any) {
    this.email = object.email;
    this.name = object.name;
    this.surname = object.surname;
  }
  readonly email: string;
  readonly name: string;
  readonly surname: string;
}
