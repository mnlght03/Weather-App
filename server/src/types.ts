import { Document } from 'mongoose';
import { User } from './schemas/user.schema';
import { History } from './schemas/history.schema';
import { Favorite } from './schemas/favorite.schema';

export interface IFavoriteItem {
  createdAt: number;
  name: string;
}

export interface IHistoryItem {
  createdAt: number;
  value: string;
}

export type UserDocument = User & Document;

export type HistoryDocument = History & Document;

export type FavoriteDocument = Favorite & Document;

// export type UserResponse = User & {
//   token: string;
// };

export interface UserResponse extends User {
  token: string;
}
