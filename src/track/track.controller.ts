import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Inject,
  forwardRef,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavsService } from '../favs/favs.service';
import { Routes } from '../utils/constants';
import { ITrack } from './interface/track.interface';

@Controller(Routes.track)
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<ITrack[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ITrack> {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await Promise.all([
      this.trackService.delete(id),
      this.favsService.removeTrack(id, false),
    ]);
    return;
  }
}
