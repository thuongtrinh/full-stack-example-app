import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = {
    cid: null,
    title: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  submitAddCategory() {
    if(this.category.title == undefined || this.category.title == null || this.category.title.trim() == '') {
      this.snackbar.open('Title required !!', 'OK', {
        duration: 1000
      });
      return;
    }
    else if(this.category.description == undefined || this.category.description == null || this.category.description.trim() == '') {
      this.snackbar.open('Description required !!', 'OK', {
        duration: 1000
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe({
      next: data => {
        this.category.title = '';
        this.category.description = '';

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Category is added successfully',
          showConfirmButton: false,
          timer: 1000
        });
      },
      error: error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Add category falied',
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => console.log('Complete. Add new category.')
    });
  }

}
