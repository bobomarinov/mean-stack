import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './models/student.model';
import axios from 'axios';

var host = '78.130.158.235';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students: any = [];
  searchResult: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.http.get('http://' + host + ':3000/students')
      .subscribe(response => {
        this.students = response;
      });
  }

  deleteStudent(uniqNumber: string) {
    axios.delete(
      'http://' + host + ':3000/students/delete?uniqNumber=' + uniqNumber,
    )
      .then(response => {
        console.log(response.data); // handle success
        // update UI after deleting
        this.getStudents();
        // press the search button
        this.searchByFirstName(this.searchResult);
      })
      .catch(error => {
        console.log(error); // handle error
      }
      );
  }


  addStudent(newStudentData: Student) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(newStudentData);
    //send as parameters
    this.http.post('http://' + host + ':3000/students?firstName=' + newStudentData.firstName + '&lastName=' + newStudentData.lastName + '&facultyNumber=' + newStudentData.facultyNumber + '&birthDate=' + newStudentData.birthDate, body, { headers })
      .subscribe(response => {
        this.getStudents();
      });
  }

  editStudent(studentData: Student) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(studentData);
    this.http.put('http://' + host + ':3000/students/edit?firstName=' + studentData.firstName + '&lastName=' + studentData.lastName + '&facultyNumber=' + studentData.facultyNumber + '&birthDate=' + studentData.birthDate + '&uniqNumber=' + studentData.uniqNumber, body, { headers })
      .subscribe(response => {
        this.getStudents();
      });
  }

  searchByFirstName(firstName: string) {
    //convert to string and send as parameters
    const body = JSON.stringify(firstName);
    this.http.get('http://' + host + ':3000/students/search?firstName=' + firstName.search)
      .subscribe(response => {
        this.searchResult = response;
      });
  }

  searchByUniqNumber(uniqNumber: string) {
    this.http.get('http://' + host + ':3000/students/id?uniqNumber=' + uniqNumber)
      .subscribe(response => {
        this.students = response;
      });
  }
}
