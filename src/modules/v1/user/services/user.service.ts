import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginResponseDto } from '../../auth/dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { UserDomain } from '../domain/user.domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneUser(field: string, identifier: string) : Promise<UserEntity> {        
    const user = await this.userRepository.findOne({
      // select: {
      //   id: true,
      //   username: true,
      //   email: true,
      //   isActive: true,
      //   // profile: {
      //   //   fullname: true,
      //   //   gender: true,
      //   //   birthDay: true,
      //   //   holoscope: true,
      //   //   zodiac: true,
      //   //   heigth: true,
      //   //   weight: true,
      //   // }
      // },
      where: {
        [field]: identifier
      },
      // relations: ['profile', 'profile.images']
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
