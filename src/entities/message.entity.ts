import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { UserEntity } from './user.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  public content: string;

  @ManyToOne(() => RoomEntity, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn()
  public room: RoomEntity;

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  public author: UserEntity;
}
