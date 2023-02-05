import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './books/book.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vercel-admin-user:2JaGWNjUqxYNeIH4@cluster0.p5mpz8r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
