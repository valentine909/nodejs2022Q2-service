import { Entity, Column, BaseEntity } from 'typeorm';

@Entity()
export class FavouritesEntity extends BaseEntity {
  @Column()
  artists: string[];

  @Column()
  albums: string[];

  @Column()
  tracks: string[];
}
