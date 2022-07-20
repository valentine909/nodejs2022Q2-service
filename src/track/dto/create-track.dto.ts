import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  duration: number;
}
