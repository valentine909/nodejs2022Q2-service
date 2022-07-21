import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';

@Module({
  imports: [
    TrackModule,
    ArtistModule,
    AlbumModule,
    UserModule,
    FavsModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(configService),
  ],
})
export class AppModule {}
