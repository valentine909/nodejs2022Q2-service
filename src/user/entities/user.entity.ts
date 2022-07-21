import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column('bigint')
  createdAt: number;

  @Column('bigint')
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt: UserEntity.bigIntAsStringToInt(createdAt as unknown as string),
      updatedAt: UserEntity.bigIntAsStringToInt(updatedAt as unknown as string),
    };
  }

  private static bigIntAsStringToInt(bigIntString: string) {
    return parseInt(bigIntString, 10);
  }
}
