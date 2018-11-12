import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BooksService } from '../books.service';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  constructor(private location: Location, private booksService: BooksService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.fetchBook();
  }

  fetchBook(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.booksService.getBook(id).subscribe(b => this.book = b);
  }
  goBack(): void {
    this.location.back();
  }

}
