import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { UserDocument, type UserResponse } from 'src/types';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findByUsername(payload.username);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async login(dto: CreateUserDto) {
    const user = await this.userService.findByUsername(dto.username);

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!passwordMatch)
      throw new HttpException(
        { message: 'Invalid credentials' },
        HttpStatus.UNAUTHORIZED,
      );

    return this.makeUserResponse(user);
  }

  async register(dto: CreateUserDto) {
    const user = await this.userService.findByUsername(dto.username);

    if (user) {
      throw new HttpException(
        { message: 'User Already Exists' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.create({
      username: dto.username,
      password: hashPassword,
    });

    return this.makeUserResponse(newUser);
  }

  private makeUserResponse(user: User): UserResponse {
    return {
      token: this.generateJwt(user),
      ...(user as UserDocument).toObject(),
    };
  }

  private generateJwt(user: User): string {
    const userObject = (user as UserDocument).toObject();
    return this.jwtService.sign(
      {
        id: userObject._id,
        username: userObject.username,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
