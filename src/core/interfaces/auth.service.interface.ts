import { AuthorizedUserDto, SignInDto, SignUpDto } from '../dto';
import { SignedUpDto } from '../messages';

export interface IAuthService {
  signIn(dto: SignInDto): Promise<AuthorizedUserDto>;
  signUp(dto: SignUpDto): Promise<SignedUpDto>;
}
