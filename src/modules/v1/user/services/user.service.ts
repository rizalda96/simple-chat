import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginResponseDto } from '../../auth/dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { UserDomain } from '../domain/user.domain';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { ProfileDomain } from '../domain/profile.domain';
import { ZODIAC, ZodiacType } from 'src/constant/zodiac';
import { UserInterestsDto } from '../dto/user-interests.dto';
import { InterestEntity } from '../entities/interest.entity';
import { difference } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    
    @InjectRepository(InterestEntity)
    private readonly interestRepository: Repository<InterestEntity>
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

  async createProfile(id: number, request: CreateProfileDto) : Promise<CreateProfileDto> {
    const isExisting = await this.profileRepository.findOne({
      where: {
        user: {
          id
        }
      }
    })
    if (isExisting) throw new UnprocessableEntityException('Profile already exists, please update it');

    // set zodiac by date of birth
    if (request.birthDay) {
      const zodiac = await this.getZodiac(request.birthDay);      
      request.holoscope = zodiac?.holoscope ?? '-';
      request.zodiac = zodiac?.zodiac ?? '-';
    }

    await this.profileRepository.save({ ...request, user: { id } });

    return request;
  }

  async updateProfile(id: number, request: CreateProfileDto) : Promise<CreateProfileDto> {    
    // set zodiac by date of birth
    if (request.birthDay) {
      const zodiac = await this.getZodiac(request.birthDay);      
      request.holoscope = zodiac?.holoscope ?? '-';
      request.zodiac = zodiac?.zodiac ?? '-';
    }

    await this.profileRepository.update({ user: { id } }, { ...request });

    return request;
  }

  async getZodiac(date: string) : Promise<NullableType<ZodiacType>> {
    // const inputDate = new Date(date);
    // const monthDay = `${String(inputDate.getMonth() + 1).padStart(2, '0')}-${String(inputDate.getDate()).padStart(2, '0')}`;    
    const monthDay = date.split('-').filter(el => el.length < 3).join('-');
    
    return ZODIAC.find(el => el.monthDayStart <= monthDay && el.monthDayEnd >= monthDay);
  }

  async storeInterests(id: number, request: UserInterestsDto) : Promise<UserInterestsDto> {
    const { interests } = request;

    const userInterests = await this.interestRepository.find({
      where: {
        user: {
          id
        }
      }
    });
    const oldInterests = userInterests.map(el => el.name);

    const interestsToAdd = difference(interests, oldInterests);
    const interestsToRemove = difference(oldInterests, interests);
    
    if (interestsToAdd.length > 0) {
      const interestEntities = interestsToAdd.map(name => {
        return {
          user: { id },
          name,
        }
      });

      await this.interestRepository.save(interestEntities);
    }

    if (interestsToRemove.length > 0) {
      await this.interestRepository.delete({ user: { id }, name: In(interestsToRemove) });
    }
    return request;
  }
}
