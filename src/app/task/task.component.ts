import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

// Interface for Task structure
interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number; // Optional: Category ID associated with the task
}

// Interface for Category structure
interface Category {
  id: number;
  name: string;
}

// Component metadata
@Component({
  standalone: true,
  selector: 'app-tasks', // Selector for this component
  templateUrl: './task.component.html', // Template file for this component
  styleUrls: ['./task.component.scss'], // Styles for this component
  imports: [
    CommonModule, // Angular's common directives
    IonicModule, // Ionic components and services
    FormsModule // Enables two-way binding
  ]
})
export class TasksComponent {
  // Input: List of tasks passed from the parent component
  @Input() tasks: Task[] = [];
  // Input: List of categories passed from the parent component
  @Input() categories: Category[] = [];

  // Output: Event emitted when a task is toggled
  @Output() toggleTask = new EventEmitter<Task>();
  // Output: Event emitted when a task is removed
  @Output() removeTask = new EventEmitter<Task>();
  // Output: Event emitted when a new task is added
  @Output() addTask = new EventEmitter<{ title: string, categoryId?: number }>();
  // Output: Event emitted when a task is edited
  @Output() editTask = new EventEmitter<{ id: number, title: string, categoryId?: number }>();

  // Variables for managing new task creation
  newTaskTitle: string = ''; // Title of the new task
  newTaskCategoryId: number | null = null; // Category ID for the new task

  // Variables for managing task editing
  editingTaskId: number | null = null; // ID of the task being edited
  editingTaskTitle: string = ''; // Title of the task being edited
  editingTaskCategoryId: number | null = null; // Category ID of the task being edited

  constructor(private alertController: AlertController) {}

  // Adds a new task and emits the event to the parent component
  onAddTask() {
    if (this.newTaskTitle.trim().length > 0) {
      this.addTask.emit({
        title: this.newTaskTitle,
        categoryId: this.newTaskCategoryId || undefined // Ensures undefined if no category is selected
      });
      this.newTaskTitle = ''; // Resets the input field
      this.newTaskCategoryId = null; // Resets the selected category
    }
  }

  // Initiates editing mode for a task
  startEditing(task: Task) {
    this.editingTaskId = task.id; // Sets the ID of the task being edited
    this.editingTaskTitle = task.title; // Pre-fills the input with the current task title
    this.editingTaskCategoryId = task.categoryId || null; // Pre-selects the category, if any
  }

  // Cancels editing mode and resets the form
  cancelEditing() {
    this.editingTaskId = null; // Resets the task ID
    this.editingTaskTitle = ''; // Clears the input field
    this.editingTaskCategoryId = null; // Resets the selected category
  }

  // Saves the edited task and emits the event to the parent component
  saveEditing() {
    if (this.editingTaskId && this.editingTaskTitle.trim()) {
      this.editTask.emit({
        id: this.editingTaskId,
        title: this.editingTaskTitle.trim(), // Trims extra spaces
        categoryId: this.editingTaskCategoryId || undefined // Ensures undefined if no category is selected
      });
      this.cancelEditing(); // Exits editing mode
    }
  }

  // Confirms task deletion via an alert before emitting the delete event
  async confirmDelete(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirm', // Title of the alert dialog
      message: 'Are you sure you want to delete this task?', // Confirmation message
      buttons: [
        {
          text: 'Cancel', // Cancel button
          role: 'cancel', // Role for cancel action
        },
        {
          text: 'Delete', // Delete button
          handler: () => {
            this.removeTask.emit(task); // Emits the task to be deleted
          }
        }
      ]
    });

    await alert.present(); // Displays the alert
  }

  // Toggles the completion status of a task and emits the updated task
  onToggleTaskCompletion(task: Task) {
    task.completed = !task.completed; // Toggles the completed status
    this.toggleTask.emit(task); // Emits the updated task
  }
}
