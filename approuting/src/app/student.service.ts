import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Student } from './student-list/Student';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token' })
};

@Injectable()
export class StudentService {
  list = new ReplaySubject();
  user = new ReplaySubject(); 
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.list.next(JSON.parse(localStorage.getItem("Students")));
    this.user.next(JSON.parse(localStorage.getItem("user")));
  }
  uuid() {
    let i: any, random: any;
    let result = '';
   
    for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
    result += '-';
    }
    result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
    .toString(16);
    }   
    return result;
  };

  public  Student = {
  id : this.uuid(),
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password:"",
  Address: {
    street: "",
    pincode: "",
    country: ""
  }
};
public Students=[];
public logeduser:any;

//display students
 displaystudents() {
  console.log(this.Students);
 }

//add student
/*  addstudents(Student) { 
  this.Students=JSON.parse(localStorage.getItem("Students"))|| [];  
  this.Students.push(Student);
  localStorage["Students"] = JSON.stringify(this.Students); 
  this.list.next(JSON.parse(localStorage.getItem("Students"))); 
  this.displaystudents();
 } */

 //localstorage based crud operations

 addstudents(Student) { 
  this.Students=JSON.parse(localStorage.getItem("Students"))|| [];  
  this.Students.push(Student);
  localStorage["Students"] = JSON.stringify(this.Students); 
  this.list.next(JSON.parse(localStorage.getItem("Students"))); 
  this.displaystudents();
 }

//update student
/*  updatestudent(student) {
  console.log(student.id);
  this.Students = JSON.parse(localStorage.getItem("Students")) || [];
  const index = this.Students.findIndex(item => item.id === student.id);
  console.log(index);
  this.Students[index]=student;
  localStorage.setItem('Students', JSON.stringify(this.Students));
  this.list.next(JSON.parse(localStorage.getItem("Students"))); 
 } */

//delete student
 deletestudent(id) {
  this.Students = JSON.parse(localStorage.getItem("Students")) || [];
  const index = this.Students.findIndex(item => item.id === id);
  console.log(index);
  this.Students.splice(index, 1);
  localStorage.setItem('Students', JSON.stringify(this.Students));
  this.list.next(JSON.parse(localStorage.getItem("Students")));  
 }
/* 
 loginCheck(login) {
    console.log(login.username);
    this.Students = JSON.parse(localStorage.getItem("Students")) || [];   
    for(let user of this.Students){
      console.log(user.username);
      if (login.username === user.username && login.password === user.password) {
        console.log(user.username);
        this.logeduser=user.username;               
        localStorage["user"] = JSON.stringify(this.logeduser);
        this.user.next(localStorage.getItem("user"));
        this.router.navigate(['/dashboard']);         
      }      
    }   
 } */


 //Httpclient based crud operations

   /** GET heroes from the server */
   getStudents (): Observable<Student[]> {
    return this.http.get<Student[]>('/api/studentdetails');      
   }

  //add students
   addStudents (student:Student) : Observable<Student[]> {
     console.log(student);         
    return this.http.post<Student[]>('/api/add', student, httpOptions);          
   } 

   getHero(id: number): Observable<Student[]> {
     console.log(id);         
     return this.http.get<Student[]>(`/api/edit/${id}`);
   }

   delStudent(id): Observable<Student[]> {
    return this.http.delete<Student []>(`/api/delete/${id}`, httpOptions);
   }

   loginCheck(student:Student) {
    console.log(student.username);
    this.http.post<Student[]>('/api/login', student, httpOptions).subscribe(data =>
      { if(student.username === data['user']) {
        console.log(data);
        localStorage["user"] = JSON.stringify(data['user']);
        localStorage["token"] = JSON.stringify(data['token']);
        this.user.next(localStorage.getItem("user"));
        this.router.navigate(['/dashboard']);  
      }      
      });
 }
 updatestudent(student) {
   let id = student.id;  
  return this.http.put<Student[]>(`/api/update/`, student, httpOptions).subscribe();  
 }
}