import { Module } from '@nestjs/common';
import { HealthModule, AuthModule, UserModule, EntrieModule } from './modules';
import { PrismaModule } from './database/prisma.module';
import { DictionaryModule, JwtModule, HistoryModule, FavoriteModule } from './services';
import { AuthGuard } from './guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    HealthModule,
    UserModule,
    AuthModule,
    EntrieModule,
    PrismaModule,
    JwtModule,
    DictionaryModule,
    HistoryModule,
    FavoriteModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
