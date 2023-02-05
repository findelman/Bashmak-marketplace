import { Controller, Post, Body, Get } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(@Body() book: any) {
    return this.bookService.create(book);
  }

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }
}