import { ObjectId } from 'mongoose';

export class UserHistoryDto {
  userId: ObjectId;
  value: string;
}
