import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class ListCategoryDto {
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
  @ApiProperty({ required: true })
  index: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  products: Product[];
}
