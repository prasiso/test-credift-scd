import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Sort } from 'src/decorator';

export class QueryFindAllGlobalDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'query page not sent' })
  @Transform(({ value }) => +value)
  page: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'query limit not sent' })
  @Transform(({ value }) => +value)
  limit: number;

  @ApiProperty({ type: String, required: false })
  @Sort()
  order?: any

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  search?: string;
}
