import { Component, inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service'; // Import the StateService

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent {
  newTask = '';
  taskList: any[] = [];
  filteredTaskList: any[] = []; // For storing the filtered task list
  httpService = inject(HttpService);
  stateService = inject(StateService); // Inject StateService

  ngOnInit() {
    // Subscribe to searchSubject to handle search functionality
    this.stateService.searchSubject.subscribe((searchTerm) => {
      if (searchTerm) {
        this.filteredTaskList = this.taskList.filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        this.filteredTaskList = [...this.taskList]; // Reset if no search term
      }
    });

    this.getAllTasks();
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.taskList = result.filter((x: any) => x.completed === true);
      this.filteredTaskList = [...this.taskList]; // Initialize filteredTaskList with all tasks
    });
  }

  onComplete(task: any) {
    task.completed = true;
    console.log('complete', task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onImportant(task: any) {
    task.important = true; // Mark the task as important
    console.log('Important', task);

    // Update the task on the server
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
}
