import { HttpService } from './../../../services/http.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss'],
})
export class AllTaskComponent {
  newTask = '';
  taskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);

  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      if (value) {
        this.taskList = this.taskList.filter(
          (x) => x.title && x.title.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    this.getAllTasks();
  }

  search(searchTerm: any) {
    this.stateService.searchSubject.next(searchTerm);
  }

  addTask() {
    const newTaskData = {
      title: this.newTask,
      createdAt: new Date() // Add createdAt property
    };

    this.httpService.addTask(newTaskData).subscribe(() => {
      this.newTask = ''; // Clear the input field
      this.getAllTasks(); // Refresh the task list
    });
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.taskList = result; // Assuming the API returns tasks in the required format
    });
  }

  onComplete(task: any) {
    task.completed = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onImportant(task: any) {
    task.important = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
}
