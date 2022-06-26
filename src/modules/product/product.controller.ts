import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { ListProductDto } from './dto/list-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: CreateProductDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List to products in index order' })
  @ApiResponse({
    status: 200,
    description: 'Products successfully listed',
    type: ProductEntity,
    isArray: true,
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'View the data of a product' })
  @ApiResponse({
    status: 200,
    description: 'Product data listed successfully',
    type: ListProductDto,
  })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get(':categoryId/products')
  @ApiOperation({ summary: 'View products by category' })
  @ApiResponse({
    status: 200,
    description: 'Product data listed successfully',
    type: ListProductDto,
    isArray: true,
  })
  findProductsByCategoryId(@Param('categoryId') id: string) {
    return this.productService.findAllByCategory(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product data' })
  @ApiResponse({
    status: 200,
    description: 'Updated product',
    type: UpdateProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 204,
    description: 'Product deleted successfully',
    type: ProductEntity,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
