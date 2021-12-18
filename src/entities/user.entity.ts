import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { MessageEntity } from './message.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  public password: string;

  @OneToMany(() => RoomEntity, (room) => room.creator, { cascade: true })
  public createdRooms: RoomEntity[];

  @ManyToMany(() => RoomEntity, (room) => room.users)
  @JoinTable({ name: 'user_rooms' })
  public rooms: RoomEntity[];

  @OneToMany(() => MessageEntity, (message) => message.author)
  public messages: MessageEntity[];
}
