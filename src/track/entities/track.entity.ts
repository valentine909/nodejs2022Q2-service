import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateTrackDto } from '../dto/create-track.dto';

export class Track {
  constructor(id: string, dto: CreateTrackDto) {
    this.id = id;
    this.name = dto.name;
    this.albumId = dto.albumId || null;
    this.artistId = dto.artistId || null;
    this.duration = dto.duration;
  }

  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsInt()
  duration: number;
}
