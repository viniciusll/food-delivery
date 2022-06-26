import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class ProductEntity implements Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @ApiProperty()
  price: Decimal;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  categoryId: string;
}
