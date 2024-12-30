import { Component, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { employee } from '../models/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeService = inject(EmployeeService);
  router = inject(Router);
  employees: employee[] = [];

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  editEmployee(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter((emp) => emp.id !== id)
      });
    }
  }
}
