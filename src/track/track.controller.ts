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
  create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll(): Promise<ITrack[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ITrack> {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.trackService.delete(id);
    await this.favsService.removeTrack(id, false);
    return;
  }
}
