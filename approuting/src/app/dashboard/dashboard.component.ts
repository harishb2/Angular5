import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _studentService: StudentService) { }

  ngOnInit() {
    this._studentService.list.subscribe(res => {
      console.log(res);
    })
  }

}
