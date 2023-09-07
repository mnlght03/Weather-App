import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { History, HistorySchema } from 'src/schemas/history.schema';
import { Favorite, FavoriteSchema } from 'src/schemas/favorite.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class UserModule {}
