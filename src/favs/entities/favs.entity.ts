import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavouritesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { array: true })
  artists: string[];

  @Column('varchar', { array: true })
  albums: string[];

  @Column('varchar', { array: true })
  tracks: string[];
}
