import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashingService } from '../../core';

@Injectable()
export class HashingService implements IHashingService {
  private rounds = 10;

  public async hash(pwd: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.rounds);
    return bcrypt.hash(pwd, salt);
  }

  public async compare(pwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pwd, hash);
  }
}
