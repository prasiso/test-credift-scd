import { ApiProperty } from '@nestjs/swagger';
class LicenseDto {
  @ApiProperty({ type: String, example: 'BY-SA 3.0' })
  name: string;

  @ApiProperty({
    type: String,
    example: 'https://creativecommons.org/licenses/by-sa/3.0',
  })
  url: string;
}
class PhoneticDto {
  @ApiProperty({ type: String, example: '/ˈfɑeə(ɹ)/' })
  text: string;

  @ApiProperty({
    required: false,
    example:
      'https://api.dictionaryapi.dev/media/pronunciations/en/fire-us.mp3',
  })
  audio?: string;

  @ApiProperty({
    required: false,
    example: 'https://commons.wikimedia.org/w/index.php?curid=424744',
  })
  sourceUrl?: string;

  @ApiProperty({ required: false, type: () => LicenseDto })
  license?: LicenseDto;
}

class DefinitionDto {
  @ApiProperty({ type: String, example: 'Amazing; excellent.' })
  definition: string;

  @ApiProperty({ type: [String] })
  synonyms: string[];

  @ApiProperty({ type: [String] })
  antonyms: string[];

  @ApiProperty({ required: false, example: 'That shit is fire, yo!' })
  example?: string;
}

class MeaningDto {
  @ApiProperty({ type: String, example: 'adjective' })
  partOfSpeech: string;

  @ApiProperty({ type: [DefinitionDto] })
  definitions: DefinitionDto[];

  @ApiProperty({ type: [String] })
  synonyms: string[];

  @ApiProperty({ type: [String] })
  antonyms: string[];
}

class RespFindOneEntrie200Dto {
  @ApiProperty({ type: String, example: 'fire' })
  word: string;

  @ApiProperty({ type: String, example: '/ˈfɑeə(ɹ)/' })
  phonetic: string;

  @ApiProperty({ type: [PhoneticDto] })
  phonetics: PhoneticDto[];

  @ApiProperty({ type: [MeaningDto] })
  meanings: MeaningDto[];

  @ApiProperty({ type: () => LicenseDto })
  license: LicenseDto;

  @ApiProperty({
    type: [String],
    example: ['https://en.wiktionary.org/wiki/fire'],
  })
  sourceUrls: string[];
}

export { RespFindOneEntrie200Dto };
