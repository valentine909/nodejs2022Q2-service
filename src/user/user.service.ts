import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import {
  findElementById,
  removeElement,
  removePassword,
  validatePassword,
  validateUUID,
} from '../utils/helpers';

@Injectable()
export class UserService {
  private _users: User[] = [];

  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const id = uuidv4();
    const user = new User(id, createUserDto);
    this._users.push(user);
    return removePassword(user);
  }

  findAll(): Omit<User, 'password'>[] {
    return this._users.map((user) => removePassword(user));
  }

  findOne(id: string): Omit<User, 'password'> {
    validateUUID(id);
    const { element } = findElementById(this._users, id);
    return removePassword(element as User);
  }

  update(id: string, updateUserDto: UpdateUserDto): Omit<User, 'password'> {
    validateUUID(id);
    const { index } = findElementById(this._users, id);
    validatePassword(this._users[index].password, updateUserDto.oldPassword);
    const { version, createdAt } = this._users[index];
    this._users[index] = new User(
      id,
      {
        ...this._users[index],
        ...{
          password: updateUserDto.newPassword,
        },
      },
      version + 1,
      createdAt,
    );
    return removePassword(this._users[index]);
  }

  remove(id: string): void {
    validateUUID(id);
    this._users = removeElement(this._users, id);
  }
}
