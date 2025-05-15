import { Module } from '@nestjs/common';
import { EntriesRouter } from '.';
import { EntriesController, EntriesService } from '.';
import {
  DictionaryModule,
  FavoriteModule,
  HashService,
  HistoryModule,
} from 'src/services';
import { EntriesRepository } from './entries.repository';

@Module({
  controllers: [EntriesRouter],
  providers: [
    EntriesController,
    EntriesService,
    HashService,
    EntriesRepository,
  ],
  imports: [DictionaryModule, HistoryModule, FavoriteModule],
})
export class EntrieModule {}
