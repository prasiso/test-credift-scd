import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [DictionaryService],
  exports: [DictionaryService],
})
export class DictionaryModule {}
