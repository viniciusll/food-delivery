import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
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

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  categoryId: string;
}
