import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.http.get('http://localhost:3000/students')
      .subscribe(response => {
        this.students = response;
      });
  }

  deleteStudent(uniqNumber: string) {
    this.http.delete('http://localhost:3000/students/delete?uniqNumber=' + uniqNumber)
      .subscribe(response => {
        this.getStudents();
      });
  }


  addStudent(newStudentData: Student) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(newStudentData);
    //send as parameters
    this.http.post('http://localhost:3000/students?firstName=' + newStudentData.firstName + '&lastName=' + newStudentData.lastName + '&facultyNumber=' + newStudentData.facultyNumber + '&birthDate=' + newStudentData.birthDate, body, { headers })
      .subscribe(response => {
        this.getStudents();
      });
    } 
}
