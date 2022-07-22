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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { Routes } from '../utils/constants';
import { AlbumService } from '../album/album.service';
import { IArtist } from './interface/artist.interface';

@Controller(Routes.artist)
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  async findAll(): Promise<IArtist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.artistService.delete(id);
    await this.trackService.nullArtist(id);
    await this.albumService.nullArtist(id);
    this.favsService.removeArtist(id, false);
    return;
  }
}
