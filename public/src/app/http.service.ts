import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
  }
  getTasks(){
  	return this._http.get('/tasks');
  }
  getTaskById(_id){
      return this._http.get(`/tasks/${_id}`);
  }
  create(newtask){
      return this._http.post(`/tasks`, newtask);
  }
  delete(_id){
      return this._http.delete(`/tasks/${_id}`);
  }
  edit(_id, currentTask){
      return this._http.put(`/tasks/${_id}`, currentTask);
  }
}
