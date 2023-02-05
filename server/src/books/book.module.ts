import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookSchema } from './book.schema';
import { BookService } from './book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'book', schema: BookSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
