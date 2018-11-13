import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../book';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book;
  @Output() cancel = new EventEmitter<Book>();
  constructor(private booksService: BooksService) { }

  ngOnInit() {
  }

  cancelSelection(book: Book): void{
    this.booksService.updateBook(book).subscribe(res => this.cancel.emit(book));
  }

}
