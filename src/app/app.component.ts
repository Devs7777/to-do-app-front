import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  categories = {
    '1': {
      id: '1',
      name: 'Work',
      tasks: {
        '1': { id: '1', title: 'Prepare slides', category: 'Work', description: 'Prepare slides for meeting' },
        '2': { id: '2', title: 'Send report', category: 'Work', description: 'Send the quarterly report' },
      },
    },
    '2': {
      id: '2',
      name: 'Personal',
      tasks: {
        '3': { id: '3', title: 'Buy groceries', category: 'Personal', description: 'Buy essentials' },
        '4': { id: '4', title: 'Call family', category: 'Personal', description: 'Check in with family' },
      },
    },
  };
}
