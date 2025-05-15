import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Module({
  exports: [FavoriteService],
  providers: [FavoriteService],
})
export class FavoriteModule {}
