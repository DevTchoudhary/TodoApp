import { StateService } from './../../services/state.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],  // Corrected here
})
export class HeaderComponent {
  stateService = inject(StateService);
  searchControl = new FormControl();

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.stateService.searchSubject.next(value || '');
    });
  }
}

