import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { EBindings, IAuthService, SignedUpDto } from '../../../core';
import { AuthorizedUserDto, SignInDto, SignUpDto } from '../../../core/dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject(EBindings.AuthService)
  private service: IAuthService;

  @ApiResponse({ type: AuthorizedUserDto })
  @Post('sing-in')
  private signIn(
    @Body(ValidationPipe) dto: SignInDto,
  ): Promise<AuthorizedUserDto> {
    return this.service.signIn(dto);
  }

  @ApiResponse({ type: SignedUpDto })
  @Post('sing-up')
  private signUp(@Body(ValidationPipe) dto: SignUpDto): Promise<SignedUpDto> {
    return this.service.signUp(dto);
  }
}
