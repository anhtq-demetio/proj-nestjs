import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponse {
  @ApiProperty({
    example: 'hogehogehogehoge',
    description: 'アクセストークン',
  })
  accessToken!: string;

  @ApiProperty({
    example: 123456,
    description: 'アクセストークンの有効期限が切れるまでの時間',
  })
  expiresIn!: number;

  constructor(accessToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}
