import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddFavoriteDto } from 'src/dto/add-favorite-dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserFavoriteDto } from 'src/dto/user-favorite.dto';
import { Favorite } from 'src/schemas/favorite.schema';
import { History } from 'src/schemas/history.schema';
import { User } from 'src/schemas/user.schema';
import { UserDocument, HistoryDocument, FavoriteDocument } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userModel.create({ ...dto });
  }

  async findById(id: ObjectId) {
    return this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }

  async getFavorites(id: ObjectId) {
    const user = await this.findById(id);

    if (!user) {
      this.throwUserDoesntExist();
    }

    return this.favoriteModel.find({
      _id: { $in: user.favorites },
    });
  }

  async addFavorite(dto: AddFavoriteDto) {
    const user = await this.findById(dto.userId);

    if (!user) {
      this.throwUserDoesntExist();
    }

    const userFavorites = await this.getFavorites(user._id);

    if (
      !userFavorites
        .map((fav) => fav.name.toLocaleLowerCase())
        .includes(dto.name.toLocaleLowerCase())
    ) {
      const newFavorite = await this.favoriteModel.create({
        userId: dto.userId,
        name: dto.name.toLocaleLowerCase(),
      });

      user.favorites.push(newFavorite._id);
      await user.save();
    }

    return user;
  }

  async deleteFavorite(dto: UserFavoriteDto) {
    const user = await this.findById(dto.userId);

    if (!user) {
      this.throwUserDoesntExist();
    }

    await this.userModel.updateOne(
      {
        _id: dto.userId,
      },
      {
        $pull: {
          favorites: dto.favoriteId,
        },
      },
    );

    return this.favoriteModel.findByIdAndDelete(dto.favoriteId);
  }

  private throwUserDoesntExist() {
    throw new HttpException(
      {
        message: "User Doesn't Exist",
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
