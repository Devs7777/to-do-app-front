import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule // Agrégalo aquí
  ]
})
export class TasksComponent {
  @Input() tasks: Task[] = [];
  @Input() categories: Category[] = [];
  @Output() toggleTask = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<Task>();
  @Output() addTask = new EventEmitter<{ title: string, categoryId?: number }>();

  newTaskTitle: string = '';
  newTaskCategoryId: number | null = null;

  onAddTask() {
    if (this.newTaskTitle.trim().length > 0) {
      this.addTask.emit({
        title: this.newTaskTitle,
        categoryId: this.newTaskCategoryId || undefined
      });
      this.newTaskTitle = '';
      this.newTaskCategoryId = null;
    }
  }
}
