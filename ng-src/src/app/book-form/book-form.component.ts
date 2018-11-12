import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book;
  @Output() cancel = new EventEmitter<Book>();
  constructor() { }

  ngOnInit() {
  }

  cancelSelection(book: Book): void{
    this.cancel.emit(book);
  }

}
