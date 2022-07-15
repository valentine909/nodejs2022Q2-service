import { CreateArtistDto } from '../dto/create-artist.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Artist {
  constructor(id: string, dto: CreateArtistDto) {
    this.id = id;
    this.name = dto.name;
    this.grammy = dto.grammy;
  }

  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
