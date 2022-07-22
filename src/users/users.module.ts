import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule {}
