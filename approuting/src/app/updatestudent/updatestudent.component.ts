import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})
export class UpdatestudentComponent implements OnInit {
  public students = [];
  userFormgroup: FormGroup;
  public id;
  public uname= this.students['username'];  
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _studentService: StudentService,
    private formBuilder: FormBuilder,
    )      
  
  {  
    this.id = this.route.snapshot.paramMap.get('id');
    this.students = JSON.parse(localStorage.getItem("Students")) || [];

    const index = this.students.findIndex(item => item.id === this.id);
    console.log(index);
    this.students=this.students[index];
    console.log(this.students['address']['street']);
    this.createForm();  
  
  }
  

  ngOnInit() {
     
       
  }
  createForm() {    
    this.userFormgroup = this.formBuilder.group({
      id:this.id,
      username: [this.students['username'],[Validators.required,Validators.minLength(4)]],
      firstname: [this.students['firstname'],[Validators.required,Validators.minLength(4)]],
      lastname: [this.students['lastname'],[Validators.required,Validators.minLength(4)]],
      email:[this.students['email'], Validators.required],
      address: this.formBuilder.group({
        street: [this.students['address']['street'], Validators.required],
        pin: [this.students['address']['pin'], Validators.required],
        country: [this.students['address']['country'], Validators.required]

      }),
    });
  }
  update(student){    
    //console.log(student);
    this._studentService.updatestudent(student);
    this.router.navigate(['/students']);  
  }
  
}
