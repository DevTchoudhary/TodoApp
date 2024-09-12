import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'] // Corrected "styleUrl" to "styleUrls"
})
export class TaskListComponent {
  @Input() taskList: any[] = [];

  // Initialize the EventEmitter properties outside the methods
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();

  markImportant(task: any) {
    this.important.emit(task); // Emit the task as important
  }

  markComplete(task: any) {
    this.complete.emit(task); // Emit the task as completed
  }

  // TrackBy function for ngFor to optimize rendering
  trackTask(index: number, task: any): number {
    return task.id; // Assuming each task has a unique 'id'
  }
}
