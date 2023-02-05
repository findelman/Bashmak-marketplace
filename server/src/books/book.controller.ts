import { Controller, Post, Body, Get } from '@nestjs/common';
import { Book } from './book.schema';

@Controller('books')
export class BookController {
  @Post()
  async create(@Body() book: any) {
    return await new Book(book).save();
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await Book.find().exec();
  }
}
