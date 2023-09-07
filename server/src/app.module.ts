import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT),
    UserModule,
  ],
})
export class AppModule {}
