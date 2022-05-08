import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoModel } from 'src/app/models/todoModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-todo',
  templateUrl: './view-todo.component.html',
  styleUrls: ['./view-todo.component.css']
})
export class ViewTodoComponent implements OnInit {

  todo: TodoModel[] = []
  constructor(private todoService: TodoService, private activateRouter: ActivatedRoute) { }

  showTodoById () {
    const params_id = this.activateRouter.snapshot.params['id'];
    this.todoService.getTodoById(params_id).subscribe(data => {
      this.todo.push(data['todo'])
    })
    console.log(this.todo);
  }
  ngOnInit(): void {
    this.showTodoById();
  }

}
