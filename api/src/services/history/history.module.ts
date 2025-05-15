import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';

@Module({
  exports: [HistoryService],
  providers: [HistoryService],
})
export class HistoryModule {}
