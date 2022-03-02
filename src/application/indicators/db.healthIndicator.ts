import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';
import { PrismaRepository } from '../../infrastructure/repositories/prisma.repository';

@Injectable()
export class DbHealthIndicator extends HealthIndicator {
  constructor(private readonly prisma: PrismaRepository) {
    super();
  }

  async isHealthy(key: string) {
    // TODO: テーブル追加したタイミングで
    // prismaはterminusにhealth checkのIndicatorがデフォルトで用意されていないので適当なテーブルを1件セレクトしてヘルスチェックを行う
    // await this.prisma.group.findFirst().catch((e) => {
    //   throw new HealthCheckError('DB status is not up', e);
    // });
    return this.getStatus(key, true);
  }
}
