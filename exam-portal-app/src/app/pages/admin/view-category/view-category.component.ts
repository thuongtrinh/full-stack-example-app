import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { ObjectRespone } from 'src/app/interfaces/object-respone';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {

  categories : Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: data => this.categories =  data.results,
      error: error => {
        console.error(error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Get all categories falied',
          showConfirmButton: false,
          timer: 1000
        });
      },
      complete: () => console.log('Complete. Categories retrieved.')
    });
  }

}
