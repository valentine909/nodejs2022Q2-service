import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  constructor(id: string, dto: CreateAlbumDto) {
    this.id = id;
    this.name = dto.name;
    this.artistId = dto.artistId || null;
    this.year = dto.year;
  }

  @IsString()
  id;

  @IsString()
  @IsNotEmpty()
  name;

  @IsInt()
  year;

  @IsString()
  @IsOptional()
  artistId;
}
