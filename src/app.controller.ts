import { FirestoreService } from './services/firestore/firestore.service';
import { Controller, Get, Param, Post, UsePipes, ValidationPipe, Request, HttpCode, Body, Put, BadRequestException, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Book } from './dto/books/book'

@Controller('books')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private firestore: FirestoreService,
  ) {}

  @Get('/')
  async getHello() {
    const booksCollection = await this.firestore.getCollection('books');
    let books = [];
    booksCollection.forEach(doc => {
      books.push({ id: doc.id, book: doc.data() });
    });
    return books;
  }

  @Get('/:id')
  async getDocument(@Param('id') doc_id) {
    const doc = await this.firestore.getDocument('books', doc_id);
    if (!doc.exists) {
      return [];
    }
    return {
      id: doc.id,
      book: doc.data(),
    };
  }

  @Post('/create')
  async createDoc(@Body() book: Book){
    // const newDoc = {
    //   name: 'Angulae NestJS',
    //   desc: 'Nestjs books',
    //   price: 250,
    //   num: 25,
    //   discount: 230,
    //   created: this.firestore.getServerTimeStamp(),
    //   updated: '',
    //   deleted:  ''
    // }
    book.created = this.firestore.getServerTimeStamp()
    const added = await this.firestore.createDoc('books', book);
    return added
  }

  @Put('/:id')
  async updateBook(@Param('id') id, @Body() book: Book){
    if(!id) throw new BadRequestException('Invalid id');
    if(!book) throw new BadRequestException('Invalid body');

    book.updated = this.firestore.getServerTimeStamp()
    const update = await this.firestore.updateDoc('books', id, book)
    return update
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id){
    const isDelete = this.firestore.deleteDoc('books', id)
    return isDelete
  }

}
