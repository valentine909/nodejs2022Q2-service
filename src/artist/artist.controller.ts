import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from '../track/track.service';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Artist {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.artistService.remove(id);
    this.trackService.findAll().forEach((track) => {
      track.artistId = track.artistId === id ? null : track.artistId;
    });
    return;
  }
}
