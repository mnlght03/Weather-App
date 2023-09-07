import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { History } from './history.schema';
import { Favorite } from './favorite.schema';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }] })
  favorites: Favorite[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }] })
  hisory: History[];
}

export const UserSchema = SchemaFactory.createForClass(User);
