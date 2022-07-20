import { IsBoolean, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsBoolean()
  grammy;
}
