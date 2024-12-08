import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { TasksComponent } from '../task/task.component';
import { CategoriesComponent } from '../category/category.component';

// Interface defining the structure of a Task
interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number; // Optional: Category the task belongs to
}

// Interface defining the structure of a Category
interface Category {
  id: number;
  name: string;
}

// Component metadata
@Component({
  standalone: true,
  selector: 'app-dashboard', // Selector for this component
  templateUrl: './dashboard.component.html', // HTML template for the component
  styleUrls: ['./dashboard.component.scss'], // Styles for the component
  imports: [CommonModule, IonicModule, TasksComponent, CategoriesComponent] // Dependencies imported for use
})
export class DashboardComponent implements OnInit {
  // Initial list of tasks
  tasks: Task[] = [
    { id: 1, title: 'Buy bread', completed: false, categoryId: 1 },
    { id: 2, title: 'Exercise', completed: false, categoryId: 2 },
    { id: 3, title: 'Read a book', completed: true, categoryId: 1 },
  ];

  // Initial list of categories
  categories: Category[] = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Health' },
  ];

  // Tracks the currently selected category for filtering tasks
  selectedCategoryId: number | null = null;

  constructor() {}

  ngOnInit() {}

  // Updates the selected category to filter tasks
  filterTasksByCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
  }

  // Returns the list of tasks filtered by the selected category
  get filteredTasks(): Task[] {
    if (this.selectedCategoryId == null) return this.tasks; // Show all tasks if no category is selected
    return this.tasks.filter(t => t.categoryId === this.selectedCategoryId); // Filter tasks by category
  }

  // Adds a new task to the task list
  addTask(title: string, categoryId?: number) {
    const newTask: Task = {
      id: this.tasks.length + 1, // Generate a unique ID
      title,
      completed: false,
      categoryId,
    };
    this.tasks.push(newTask);
  }

  // Toggles the completion status of a task
  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }

  // Removes a task from the task list
  removeTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }

  // Adds a new category to the category list
  addCategory(name: string) {
    const newCategory = { id: this.categories.length + 1, name };
    this.categories.push(newCategory);
  }

  // Removes a category and its associated tasks
  removeCategory(cat: Category) {
    this.categories = this.categories.filter(c => c.id !== cat.id); // Remove the category

    if (this.selectedCategoryId === cat.id) {
      this.selectedCategoryId = null; // Reset the selected category if it was removed
    }

    this.tasks = this.tasks.filter(t => t.categoryId !== cat.id); // Remove tasks linked to the deleted category
  }

  // Edits a task's title and category
  editTask(event: { id: number, title: string, categoryId?: number }) {
    const index = this.tasks.findIndex(t => t.id === event.id); // Find the task by ID
    if (index !== -1) {
      this.tasks[index].title = event.title; // Update the title
      this.tasks[index].categoryId = event.categoryId; // Update the category
    }
  }

  // Edits a category's name
  editCategory(event: { id: number, name: string }) {
    const index = this.categories.findIndex(c => c.id === event.id); // Find the category by ID
    if (index !== -1) {
      this.categories[index].name = event.name.trim(); // Update the category name
    }
  }
}
