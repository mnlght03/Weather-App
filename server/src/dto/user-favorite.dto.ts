import { ObjectId } from 'mongoose';
import { Favorite } from 'src/schemas/favorite.schema';

export class UserFavoriteDto {
  userId: ObjectId;
  favoriteId: ObjectId;
}
