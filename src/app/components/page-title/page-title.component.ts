import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'] // Fixed 'styleUrl' to 'styleUrls'
})
export class PageTitleComponent {
  @Input() creationDate: Date = new Date(); // Input property for creation date
}
