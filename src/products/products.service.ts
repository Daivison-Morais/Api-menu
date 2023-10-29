import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.Repository';

@Injectable()
export class ProductsService {
  constructor(private repository: ProductsRepository) {}
  async create(product: CreateProductDto) {
    const findProduct = await this.repository.findName(product.name);
    if (findProduct) {
      throw new BadRequestException('name already in use');
    }
    return await this.repository.create(product);
  }

  async findAll() {
    const listAll = await this.repository.findAll();
    if (listAll.length === 0) {
      return { message: 'Empty list' };
    }
    return listAll;
  }

  async findOne(id: string) {
    const findById = await this.repository.findOne(id);
    if (!findById) throw new BadRequestException('id not found');
    return findById;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const findById = await this.repository.update(id, updateProductDto);
    if (!findById) throw new BadRequestException('id not found');
    return findById;
  }

  async remove(id: string) {
    const findById = await this.repository.findOne(id);
    if (!findById) throw new BadRequestException('id not found');

    await this.repository.remove(id);
  }
}