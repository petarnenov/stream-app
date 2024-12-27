//https://github.com/typeorm/typeorm/blob/master/test/functional/database-schema/column-types/postgres/entity/Post.ts
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

  @Column({
    nullable: true,
  })
  message: string;

  @Column({
    nullable: true,
  })
  stepsToReproduce: string;

  @Column()
  stackTrace: string;

  @CreateDateColumn()
  createdAt: Date;
}
