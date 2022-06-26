import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ListCategoryDto } from './dto/list-category.dto';
import { RemoveCategoryDto } from './dto/remove-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    type: CreateCategoryDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters' })
  create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'List to categories in index order' })
  @ApiResponse({
    status: 200,
    description: 'Categories successfully listed',
    type: CategoryEntity,
    isArray: true,
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'View the data of a category' })
  @ApiResponse({
    status: 200,
    description: 'Category data listed successfully',
    type: ListCategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category data' })
  @ApiResponse({
    status: 200,
    description: 'Updated category',
    type: UpdateCategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: 204,
    description: 'Category deleted successfully',
    type: CategoryEntity,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  remove(@Param('id') id: string, @Body() data: RemoveCategoryDto) {
    return this.categoryService.remove(id, data);
  }
}
