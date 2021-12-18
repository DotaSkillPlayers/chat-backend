import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  public uuid: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public name: string;

  @ManyToOne(() => UserEntity, (user) => user.createdRooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public creator: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.rooms)
  public users: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.room)
  public messages: MessageEntity[];
}
