import { ApiProperty } from '@nestjs/swagger';

export class SignedUpDto {
  @ApiProperty({ type: String, example: 'Signed up successfully' })
  public message = 'Signed up successfully';
}
