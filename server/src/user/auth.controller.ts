import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
