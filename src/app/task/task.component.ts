import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ]
})
export class TasksComponent {
  @Input() tasks: Task[] = [];
  @Input() categories: Category[] = [];
  @Output() toggleTask = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<Task>();
  @Output() addTask = new EventEmitter<{ title: string, categoryId?: number }>();
  @Output() editTask = new EventEmitter<{ id: number, title: string, categoryId?: number }>();

  newTaskTitle: string = '';
  newTaskCategoryId: number | null = null;

  editingTaskId: number | null = null;
  editingTaskTitle: string = '';
  editingTaskCategoryId: number | null = null;

  constructor(private alertController: AlertController) {}

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

  startEditing(task: Task) {
    this.editingTaskId = task.id;
    this.editingTaskTitle = task.title;
    this.editingTaskCategoryId = task.categoryId || null;
  }

  cancelEditing() {
    this.editingTaskId = null;
    this.editingTaskTitle = '';
    this.editingTaskCategoryId = null;
  }

  saveEditing() {
    if (this.editingTaskId && this.editingTaskTitle.trim()) {
      this.editTask.emit({
        id: this.editingTaskId,
        title: this.editingTaskTitle,
        categoryId: this.editingTaskCategoryId || undefined
      });
      this.cancelEditing();
    }
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.removeTask.emit(task);
          }
        }
      ]
    });

    await alert.present();
  }
}
