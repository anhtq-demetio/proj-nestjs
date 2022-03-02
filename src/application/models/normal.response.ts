import { ApiProperty } from '@nestjs/swagger';

export class NormalResponse {
  @ApiProperty()
  private readonly result: string;

  constructor(result: string) {
    this.result = result;
  }
}
