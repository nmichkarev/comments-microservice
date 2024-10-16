import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async saveUser(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findOne(login: string) {
    return this.usersRepository.findOneBy({ login });
  }
}
