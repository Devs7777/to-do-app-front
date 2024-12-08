import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 

// Interfaces for category and task objects
interface Category {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  categoryId?: number; // Optional property to associate the task with a category
}

// Component metadata
@Component({
  standalone: true,
  selector: 'app-categories', // Selector to use this component in other templates
  templateUrl: './category.component.html', // Template file
  styleUrls: ['./category.component.scss'], // Styles file
  imports: [
    CommonModule, // Angular's common directives
    IonicModule, // Ionic components and services
    FormsModule // Support for two-way data binding
  ]
})
export class CategoriesComponent {
  // Inputs to receive data from parent component
  @Input() categories: Category[] = []; // List of categories
  @Input() tasks: Task[] = []; // List of tasks

  // Outputs to emit events to the parent component
  @Output() filterCategory = new EventEmitter<number | null>(); // Emits the selected category ID or null for all tasks
  @Output() addCategory = new EventEmitter<string>(); // Emits the new category name
  @Output() removeCategory = new EventEmitter<Category>(); // Emits the category to be removed
  @Output() editCategory = new EventEmitter<{ id: number, name: string }>(); // Emits edited category details

  // Variables to manage category addition
  newCategoryName: string = ''; // Stores the name of the new category
  expandedCategoryId: number | null = null; // Tracks the currently expanded category

  // Variables for category editing
  editingCategoryId: number | null = null; // ID of the category being edited
  editingCategoryName: string = ''; // Edited name of the category

  constructor(private alertController: AlertController) {}

  // Emits an event to show all tasks
  filterAll() {
    this.filterCategory.emit(null);
    this.expandedCategoryId = null; // Collapses all categories
  }

  // Adds a new category if the input is not empty
  onAddCategory() {
    if (this.newCategoryName.trim()) {
      this.addCategory.emit(this.newCategoryName.trim());
      this.newCategoryName = ''; // Clears the input field
    }
  }

  // Toggles the expanded state of a category
  toggleCategory(cat: Category) {
    if (this.expandedCategoryId === cat.id) {
      this.expandedCategoryId = null; // Collapse the category if already expanded
    } else {
      this.expandedCategoryId = cat.id; // Expand the clicked category
    }
  }

  // Filters tasks belonging to a specific category
  getTasksForCategory(catId: number) {
    return this.tasks.filter(task => task.categoryId === catId);
  }

  // Initiates editing mode for a category
  startEditingCategory(cat: Category) {
    this.editingCategoryId = cat.id; // Sets the ID of the category being edited
    this.editingCategoryName = cat.name; // Pre-fills the input with the current category name
  }

  // Cancels editing mode
  cancelEditingCategory() {
    this.editingCategoryId = null;
    this.editingCategoryName = ''; // Clears the editing input
  }

  // Saves the edited category name and emits the updated data
  saveEditingCategory() {
    if (this.editingCategoryId && this.editingCategoryName.trim()) {
      this.editCategory.emit({
        id: this.editingCategoryId,
        name: this.editingCategoryName.trim()
      });
      this.cancelEditingCategory(); // Resets the editing mode
    }
  }

  // Asks for confirmation before deleting a category
  async confirmDeleteCategory(cat: Category) {
    const alert = await this.alertController.create({
      header: 'Confirm', // Title of the alert
      message: `Are you sure you want to delete the category "${cat.name}"? This will also delete all tasks assigned to this category.`,
      buttons: [
        {
          text: 'Cancel', // Button to cancel deletion
          role: 'cancel',
        },
        {
          text: 'Delete', // Button to confirm deletion
          handler: () => {
            this.removeCategory.emit(cat); // Emits the category to be deleted
          }
        }
      ]
    });

    await alert.present(); // Displays the alert
  }
}
