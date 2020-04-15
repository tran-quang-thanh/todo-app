import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  filter: string;

  constructor(private http: HttpClient) { 
    this.http.get('/api/v1').subscribe((data: any) => {
      this.todos = [
        {
          'id': data[0].id,
          'title': data[0].title,
          'completed': data[0].completed,
          'editing': data[0].editing
        }
      ]
      for (let i = 1; i < data.length; i++) {
        this.todos.push({
          'id': data[i].id,
          'title': data[i].title,
          'completed': data[i].completed,
          'editing': data[i].editing
        })
      }
      this.idForTodo = data.length + 1;
    })
   }

  ngOnInit(): void {
    this.todoTitle = '';
    this.filter = 'all';
    if (this.idForTodo === undefined) {
      this.idForTodo = 1
      this.todos = []
    }
    // this.todos = [
    //   {
    //     'id': 1,
    //     'title': 'First one',
    //     'completed': false,
    //     'editing': false,
    //   }
    // ];
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    let data : any = Object.assign({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.http.post('/api/v1', data).subscribe();

    this.todoTitle = '';
    this.idForTodo += 1;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.http.delete('api/v1/' + id).subscribe()
  }

  editTodo(todo: Todo): void {
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    todo.editing = false;
    if (todo.title.trim().length === 0) {
      this.deleteTodo(todo.id);
    } else {
      this.update(todo)
    }
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
    if (this.todos.length > 0) {
      this.http.post('api/v1/checkall', {completed: this.todos[0].completed}).subscribe()
    }
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed)
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else {
      return this.todos;
    }
  }

  update(todo: Todo): void {
    this.http.post('api/v1/update', todo).subscribe()
  }
}
