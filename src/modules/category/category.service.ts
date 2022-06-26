import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 } from 'uuid';
import { RemoveCategoryDto } from './dto/remove-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (categoryExists) {
      throw new Error('Category already exists');
    }

    return await this.prisma.category.create({
      data: {
        ...data,
        id: v4(),
      },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      orderBy: {
        index: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
      },
      include: {
        Product: true,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const updatedCategory = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });

    return updatedCategory;
  }

  async remove(id: string, data: RemoveCategoryDto) {
    const category = await this.prisma.category.findFirst({
      where: {
        id,
      },
      include: {
        Product: true,
      },
    });

    const newCategory = await this.prisma.category.findFirst({
      where: { id: data.newCategoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    if (!newCategory) {
      throw new Error(
        'Please pass a new category for the products in that category you are deleting!',
      );
    }

    if (category.Product.length > 0) {
      const products = category.Product;
      await Promise.all([
        products.forEach(async (product) => {
          await this.prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              categoryId: newCategory.id,
            },
          });
        }),
      ]);
    }

    const deletedCategory = await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return deletedCategory;
  }
}
