import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { UserFavoriteDto } from 'src/dto/user-favorite.dto';
import { AddFavoriteDto } from 'src/dto/add-favorite-dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user/:id')
  getUser(@Param('id') id: ObjectId) {
    return this.userService.findById(id);
  }

  @Get('/user/:id/favorites')
  getFavorites(@Param('id') id: ObjectId) {
    return this.userService.getFavorites(id);
  }

  @Post('/user/favorites')
  // @UseGuards(AuthGuard('jwt'))
  addFavorite(@Body() dto: AddFavoriteDto) {
    return this.userService.addFavorite(dto);
  }

  @Delete('/user/favorites')
  deleteFavorite(@Body() dto: UserFavoriteDto) {
    return this.userService.deleteFavorite(dto);
  }
}
