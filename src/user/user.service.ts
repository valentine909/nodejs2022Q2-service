import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validatePassword } from '../utils/helpers';
import { IUser } from './model/user.model';
import { Messages } from '../utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<IUser, 'password'>> {
    const user = this.userRepository.create({
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return (await this.userRepository.save(user)).toResponse();
  }

  async findAll(): Promise<Omit<IUser, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findOne(id: string): Promise<Omit<IUser, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) return user.toResponse();
    throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const { oldPassword, newPassword } = updateUserDto;
    const { version } = user;
    validatePassword(user.password, oldPassword);
    const updatedUser = Object.assign(user, {
      password: newPassword,
      version: version + 1,
      updatedAt: Date.now(),
    });
    return (await this.userRepository.save(updatedUser)).toResponse();
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
