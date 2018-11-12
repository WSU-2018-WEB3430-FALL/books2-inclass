import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Array<Book>;
  selectedBook: Book;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe(books => this.books = books);
  }

  onEdit(book: Book): void {
    this.selectedBook = book;
  }

  unselect(book: Book): void {
    this.selectedBook = null;
  }

}
