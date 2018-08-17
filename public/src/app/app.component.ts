import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  tasksAll:any = [];
  tasksToDo: any = [];
  tasksComplete: any = [];
  currentTask: any;
  newTask: any;
  editting: boolean;
  constructor(private _httpService: HttpService){};
  ngOnInit(){
      this.newTask = { title: "", description: "" };
      this.editting = false;
  }
  getTasksFromService(){
  	let observable = this._httpService.getTasks();
  	observable.subscribe(data => {
  		this.tasksAll = data
  		for (let i of this.tasksAll) {
  			if (i.completed == true) {
  				this.tasksComplete.push(i)
  			}
       else {
  				this.tasksToDo.push(i)
  			}
  		}
  	});
  }
  getTaskById(_id){
      let observable = this._httpService.getTaskById(_id);
      observable.subscribe(data => {
          this.currentTask = data;
          this.editting = false;
      });
  }
  editTask(_id){
      let observable = this._httpService.getTaskById(_id);
      observable.subscribe(data => {
          this.currentTask = data;
          this.editting = true;
      });
  }

  deleteTask(_id){
      let observable = this._httpService.delete(_id);
      observable.subscribe();
      this.getTasksFromService();
  }
  onSubmit(){
      let observable = this._httpService.create(this.newTask);
      observable.subscribe(data => {
          this.getTasksFromService();
          this.newTask = { title: "", description: "" };
      });
  }
  onEdit(_id){
      let observable = this._httpService.edit(this.currentTask[0]._id, this.currentTask[0]);
      observable.subscribe();
      this.editting = false;
      this.getTasksFromService();
  }
}
