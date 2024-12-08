import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 

interface Category {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-categories',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule 
  ]
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];
  @Output() filterCategory = new EventEmitter<number|null>();
  @Output() addCategory = new EventEmitter<string>();
  @Output() removeCategory = new EventEmitter<Category>();

  newCategoryName: string = '';

  filterAll() {
    this.filterCategory.emit(null);
  }

  onAddCategory() {
    if (this.newCategoryName.trim()) {
      this.addCategory.emit(this.newCategoryName);
      this.newCategoryName = '';
    }
  }
}
