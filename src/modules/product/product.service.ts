import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { v4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        name: data.name,
      },
    });

    const categoryExists = await this.prisma.category.findFirst({
      where: {
        id: data.categoryId,
      },
    });

    if (productExists) {
      throw new Error('Product already exists');
    }

    if (!categoryExists) {
      throw new Error('Category not found');
    }

    return await this.prisma.product.create({
      data: {
        id: v4(),
        ...data,
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error('product not found');
    }

    const updatedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const deletedProduct = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return deletedProduct;
  }
}
