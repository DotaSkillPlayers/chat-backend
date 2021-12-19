import { EntityRepository, Repository } from 'typeorm';
import { MessageEntity } from '../../entities';

@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
