import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginResponseDto } from '../../auth/dto/login-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneUser(field: string, identifier: string) : Promise<UserEntity> {    
    const user: UserEntity = await this.userRepository.findOneBy({ 
      [field]: identifier
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(user: CreateUserDto) : Promise<UserEntity> {
    const userExists = await this.userRepository.findOne({
      where: [
        {
          username: user.username
        },
        {
          email: user.email
        }
      ]
    })

    if (userExists) throw new UnprocessableEntityException('User already exists');

    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    
    return this.userRepository.save(user);
  }

  async updateUser(id: number, user: UpdateUserDto) : Promise<UserEntity> {
    await this.findOneUser('id', id.toString());
    return this.userRepository.save(user);
  }
}
