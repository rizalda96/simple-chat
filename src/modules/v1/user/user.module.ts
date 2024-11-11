import { HttpStatus, Module, UnprocessableEntityException } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { InterestEntity } from './entities/interest.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ImageProfileEntity } from './entities/image-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, InterestEntity, ImageProfileEntity]),
    MulterModule.registerAsync({
      useFactory: () => {
        return {
          fileFilter: (request, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
              return callback(
                new UnprocessableEntityException('Only image files are allowed ( jpg, jpeg, png )'),
                false,
              );
            }

            callback(null, true);
          },
          storage: diskStorage({
            destination: './uploads',
            filename: (request, file, callback) => {
              callback(
                null,
                `${randomStringGenerator()}.${file.originalname
                  .split('.')
                  .pop()
                  ?.toLowerCase()}`,
              );
            },
          }),
          limits: {
            fileSize: 1024 * 1024 * 2, // 2MB
          },
        }
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
