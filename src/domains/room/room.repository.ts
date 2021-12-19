import { EntityRepository, Repository } from 'typeorm';
import { RoomEntity } from '../../entities';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {
  public async isUserInRoom(uuid: string, user: number): Promise<boolean> {
    return this.manager
      .query(
        'SELECT COUNT(*) from "chat".user_rooms "ur" WHERE "ur".rooms_uuid = $1 AND ur.users_id = $2',
        [uuid, user],
      )
      .then((r) => Number(r[0]?.count) !== 0);
  }

  public async joinRoom(uuid: string, user: number): Promise<void> {
    return this.manager.query(`INSERT INTO chat.user_rooms VALUES ($1, $2)`, [
      user,
      uuid,
    ]);
  }

  public async leaveRoom(uuid: string, user: number): Promise<void> {
    return this.manager.query(
      `DELETE FROM chat.user_rooms ur WHERE ur.rooms_uuid = $1 AND ur.users_id = $2`,
      [uuid, user],
    );
  }

  public getRoom(uuid: string): Promise<[RoomEntity, number]> {
    return this.manager
      .query(
        'SELECT r.name, r.uuid, users FROM chat.rooms r, (SELECT COUNT(*) FROM chat.user_rooms ur WHERE ur.rooms_uuid = $1) as users WHERE r.uuid = $1',
        [uuid],
      )
      .then((result) => {
        if (!result) {
          return null;
        }
        const [{ uuid, name, users }] = result;
        const u = (users as string).replace('(', '').replace(')', '');
        return [Object.assign(new RoomEntity(), { uuid, name }), Number(u)];
      });
  }
}
