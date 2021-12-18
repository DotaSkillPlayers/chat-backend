export interface IHashingService {
  hash(pwd: string): Promise<string>;
  compare(pwd: string, hash: string): Promise<boolean>;
}
