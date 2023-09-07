import { ObjectId } from "mongoose";

export class AddFavoriteDto {
  userId: ObjectId
  name: string
}