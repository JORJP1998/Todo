import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/app/models/todoModel';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  message_arr: Array<any> = [];
  created_todo_message: string = '';
  todo: TodoModel = new TodoModel('');
  todo_list: Array<any> = [];
  todo_empty: string = '';
  
  
  constructor(private todoService: TodoService, private router: Router) { }

  addUsersTodo() {
    return this.todoService.addTodo(this.todo.title).subscribe(data => {
      this.message_arr.push(data);
      this.showAlltodos();
      setTimeout(() => {
        this.message_arr = [];
      },5000);
    })
    
  }

  showAlltodos () {
    this.todoService.getAllTodos().subscribe(data => {
      if (Array.isArray(data)) {
        this.todo_empty = '';
        data.map(todo => {
          if (todo['completed'] == false) {
            if (todo["title"].length > 20) {
              todo['title'] = todo['title'].slice(0, 20) + '...';
            }
            this.todo_list.push(todo);
          }
        })
        if (!this.todo_list.length) this.todo_empty = 'There are no todos';
      }
      else {
        this.todo_empty = data['message'];
      }
    })
  }

  showTodoById (id: number) {
    this.todoService.getTodoById(id).subscribe(data => {
      if (data['found'] === true) this.router.navigate([`todo/${id}`]);
      else {
        this.router.navigate(['todo/notfound'])
      }
    })
  }

  completeUserTodo (id: number) {
      this.todoService.compliteTodo(id).subscribe(data => {
        this.todo_list.map((todo, index) => {
          if (todo.id === id) {
            this.todo_list.splice(index, 1);
          }
        })
      })
  }


  ngOnInit(): void {
    this.showAlltodos();
  }

}
