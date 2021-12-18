export class CreateUserDto {
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {}
}
