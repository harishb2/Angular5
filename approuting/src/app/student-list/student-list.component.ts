import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {  Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Student } from './Student';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public students: any;
 
  draftSearch = new FormControl();
  constructor(
    private router: Router,
    private _studentService: StudentService) { }

  ngOnInit() {
  //   console.log("in", this.students);

  //  this.students= JSON.parse(localStorage["Students"]);
  //   console.log(this.students);

  /*   this._studentService.list.subscribe(res => {
      this.students = res;
    }) */

    this.getHeroes();
    this.draftSearch.valueChanges
      .debounceTime(500)
      .subscribe(val => {
        if (val) {
          this.students = this.students.filter(el => el.firstname.toUpperCase().includes(val.toUpperCase()))
        } else {
          this.students= JSON.parse(localStorage["Students"]);          
        }
      });
  }

  getHeroes(): void {
    this._studentService.getStudents()
      .subscribe((heroes: any) => this.students = heroes.users);
  }

  delstudent(id): void {
    console.log(id);
    
  this._studentService.delStudent(id).subscribe();
  //this.students= JSON.parse(localStorage["Students"]);
  this.router.navigate['/students'];    
  }

  formedit() {    
  }

}
