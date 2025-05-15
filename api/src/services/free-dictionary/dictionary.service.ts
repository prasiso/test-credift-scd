import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { WordEntry } from './interface/dictionary';

@Injectable()
export class DictionaryService {
  constructor(private readonly httpService: HttpService) {}
  async search_in_free_dictionary(
    word: string,
  ): Promise<AxiosResponse<WordEntry[]>> {
    const data = await this.httpService.axiosRef.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    return data;
  }
}
