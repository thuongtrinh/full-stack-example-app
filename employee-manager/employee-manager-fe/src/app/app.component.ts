import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './interface/employee';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'employee-manager-app';

  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;
  
  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);}
    );
  }

  public onOpenModel(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if(mode === 'edit') {
      if(employee !== null) {
        this.editEmployee = employee;
      }
      button.setAttribute('data-target', '#updateEmployeeModal');
    } else if(mode === 'delete') {
      if(employee !== null){
        this.deleteEmployee = employee;
      }
      button.setAttribute('data-target', '#deleteEmployeeModal');
    } else {}

    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm) {
    document.getElementById('close-employee-form')?.click();
    this.employeeService.addEmployees(addForm.value).subscribe(
      (respone: Employee) => {
        console.log(respone);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(editForm: NgForm) {
    document.getElementById('close-employee-form-edit')?.click();
    this.employeeService.updateEmployee(editForm.value).subscribe(
      (respone: Employee) => {
        console.log(respone);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        // alert(error.message)
        console.log(error.message)
      }
    );
  }

  public onDeleteEmployee(employeeId: number | undefined) {
    document.getElementById('close-employee-form-delete')?.click();
    if(employeeId){
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (respone: void) => {
          console.log(respone);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      );
    } else {
      console.error("employeeId invalid")
    }
  }

  public searchEmployees(keySearch: string): void {
    console.log(keySearch);
    const result: Employee[] = [];
    if(this.employees == undefined){
      return;
    }

    for(const employee of this.employees){
      if(keySearch && employee.name.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(keySearch.toLowerCase()) !== -1
        ){
          result.push(employee);
      }
    }

    this.employees = result;
    if(result.length === 0 || !keySearch){
      this.getEmployees();
    }
  }

}
