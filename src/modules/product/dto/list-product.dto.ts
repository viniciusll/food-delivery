import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListProductDto {
  @IsUUID()
  id: string;

  @IsString()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsInt()
  @ApiProperty()
  price: number;

  @IsString()
  @ApiProperty()
  photoUrl: string;

  @IsString()
  @ApiProperty()
  categoryId: string;
}
