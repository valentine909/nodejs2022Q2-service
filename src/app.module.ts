import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [TrackModule, ArtistModule, AlbumModule, UserModule, FavsModule],
})
export class AppModule {}
