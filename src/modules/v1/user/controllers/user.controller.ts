import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UserDomain } from '../domain/user.domain';
import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { NullableType } from 'src/utils/types/nullable.type';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileDomain } from '../domain/profile.domain';

@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDomain,
  })
  @Get('me')
  @ResponseMessage('Success get profile')
  async me(@Request() request: any): Promise<UserDomain> {    
    const user: UserDomain = await this.userService.findOneUser('id', request.user.id);

    const { password, ...res } = user;
    return res;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserDomain,
  })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ResponseMessage('Success get profile')
  async findOne(@Param('id') id: string): Promise<any> {    
    const user = await this.userService.findOneUser('id', id);

    const { password, ...res } = user;
    return res;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: CreateProfileDto,
  })
  @Post('create-profile')
  @ResponseMessage('Success create profile')
  async profileCreate(@Request() request: any, @Body() body: CreateProfileDto): Promise<CreateProfileDto> {
    const { id } = request.user;
    return await this.userService.createProfile(+id, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CreateProfileDto,
  })
  @Patch('update-profile')
  @ResponseMessage('Success update profile')
  async profileUpdate(@Request() request: any, @Body() body: CreateProfileDto): Promise<CreateProfileDto> {
    const { id } = request.user;
    return await this.userService.updateProfile(+id, body);
  }
}
