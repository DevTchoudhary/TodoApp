import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Injecting HttpClient
  httpClient = inject(HttpClient);

  // Method to add a task
  addTask(task: { title: string; createdAt: Date }) {
    return this.httpClient.post("http://localhost:3000/tasks", task);
  }

  // Method to get all tasks
  getAllTasks() {
    return this.httpClient.get("http://localhost:3000/tasks");
  }

  // Method to update a task
  updateTask(task: any) {
    return this.httpClient.put(`http://localhost:3000/tasks/${task.id}`, task);
  }
}
