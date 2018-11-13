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
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.booksService.getBooks().subscribe(books => this.books = books);
  }

  onEdit(book: Book): void {
    this.selectedBook = book;
  }

  onCreate(): void {
    this.booksService.createBook({_id: null, title: "", author: "", isbn: ""}).subscribe(res => this.fetchBooks());
  }

  onDelete(book: Book): void{
    this.booksService.deleteBook(book).subscribe(_ => this.fetchBooks());
  }
  unselect(book: Book): void {
    this.selectedBook = null;
    this.fetchBooks();
  }

}
