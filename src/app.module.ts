import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [TrackModule, ArtistModule],
})
export class AppModule {}
