import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../task/task.component';
import { CategoriesComponent } from '../category/category.component';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, IonicModule, TasksComponent, CategoriesComponent]
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [
    { id: 1, title: 'Comprar pan', completed: false, categoryId: 1 },
    { id: 2, title: 'Hacer ejercicio', completed: false, categoryId: 2 },
    { id: 3, title: 'Leer un libro', completed: true, categoryId: 1 },
  ];

  categories: Category[] = [
    { id: 1, name: 'Hogar' },
    { id: 2, name: 'Salud' },
  ];

  selectedCategoryId: number | null = null;

  constructor() {}

  ngOnInit() {}

  filterTasksByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }

  get filteredTasks(): Task[] {
    if (this.selectedCategoryId == null) return this.tasks;
    return this.tasks.filter(t => t.categoryId === this.selectedCategoryId);
  }

  addTask(title: string, categoryId?: number) {
    const newTask: Task = {
      id: this.tasks.length + 1,
      title,
      completed: false,
      categoryId
    };
    this.tasks.push(newTask);
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  addCategory(name: string) {
    const newCategory = { id: this.categories.length + 1, name };
    this.categories.push(newCategory);
  }

  removeCategory(cat: Category) {
    this.categories = this.categories.filter(c => c.id !== cat.id);
    // Si la categoría removida estaba seleccionada, se limpia el filtro.
    if (this.selectedCategoryId === cat.id) {
      this.selectedCategoryId = null;
    }
  }
}
