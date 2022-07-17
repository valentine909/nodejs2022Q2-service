import { IsArray } from 'class-validator';

export class Favourites {
  @IsArray()
  artists: string[];

  @IsArray()
  albums: string[];

  @IsArray()
  tracks: string[];
}
