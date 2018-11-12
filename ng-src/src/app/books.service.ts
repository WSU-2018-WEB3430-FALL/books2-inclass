import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SAMPLE_BOOKS } from './sample-books';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Array<Book>> {
    return this.http.get<Book[]>('/api/books', httpOptions);
  }

  getBook(id: number): Observable<Book> {
    return of(SAMPLE_BOOKS.find(book => id === book._id));
  }
}
