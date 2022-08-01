import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BigintTransformer } from './bigint.transformer';

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

  @Column('bigint', { transformer: new BigintTransformer() })
  createdAt: number;

  @Column('bigint', { transformer: new BigintTransformer() })
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt,
      updatedAt,
    };
  }
}
