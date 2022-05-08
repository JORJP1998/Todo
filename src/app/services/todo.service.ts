import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private req_router: string = '/api/todo/';

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<any> {
    return this.http.get(`${this.req_router}`);
  }

  getTodoById(id: number): Observable<any> {
    return this.http.get(`${this.req_router}${id}`);
  }

  addTodo(title: string): Observable<{}> {
    return this.http.post(`${this.req_router}`, {
      title
    })
  }

  compliteTodo(id: number): Observable<any> {
    return this.http.patch(`${this.req_router}${id}/complete`, {});
  }

  updateTodo() {}

  deleteTodo() {}
}
