import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userFormgroup: FormGroup;

  public users=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _studentService: StudentService
    ) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {    
    this.userFormgroup = this.formBuilder.group({
      id:[this._studentService.uuid()],      
      username: ['',[Validators.required,Validators.minLength(4)]],
      firstname: ['',[Validators.required,Validators.minLength(4)]],
      lastname: ['',[Validators.required,]],
      email:['', [Validators.required, this.isEmailValid('email')]],
      password: ['',[Validators.required,Validators.minLength(4)]],
      address: this.formBuilder.group({        
        street: [''],
        pin: [''],
        country: ['']
      }),
      subjects: this.formBuilder.array([]),   
      });
  }
  isEmailValid(control) {
    return control => {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(control.value) ? null : { invalidEmail: true };
    }
  }

/*         save(admin) {
        console.log(admin.username);
        this.admin=JSON.parse(localStorage.getItem("admin"))|| [];  
        this.admin.push(admin);
        localStorage["admin"] = JSON.stringify(this.admin);
        this.router.navigate(['/login']);         
      } */

  addstudent(students) {  
        this._studentService.addStudents(this.userFormgroup.value) .subscribe(hero => {
          this.users.push(hero);
        });        
        this.router.navigate(['/login']); 
  }
}

