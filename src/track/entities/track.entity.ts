import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  constructor(id: string, dto: CreateTrackDto) {
    this.id = id;
    this.name = dto.name;
    this.albumId = dto.albumId || null;
    this.artistId = dto.artistId || null;
    this.duration = dto.duration;
  }

  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}
