import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Source {
  BE,
  FE,
}

@Entity()
export class Monitoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  source: Source;

  @Column()
  stackTrace: string;

  @CreateDateColumn()
  createdAt: Date;
}
