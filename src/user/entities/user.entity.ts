import { CreateUserDto } from '../dto/create-user.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class User {
  constructor(
    id: string,
    dto: CreateUserDto,
    version = 1,
    createdAt = Date.now(),
  ) {
    this.id = id;
    this.login = dto.login;
    this.password = dto.password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = Date.now();
  }

  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;
}
