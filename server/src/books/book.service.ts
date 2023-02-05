import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
    constructor(@InjectModel('Book') private bookModel: Model<any>) {}

  async findAll(): Promise<any[]> {
    return this.bookModel.find().exec();
  }

  async create(book: any): Promise<any> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }
}