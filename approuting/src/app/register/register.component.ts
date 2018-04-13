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

  public admin=[];

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
      id:this._studentService.uuid(),
      name: ['',[Validators.required,Validators.minLength(4)]],
      username: ['',[Validators.required,Validators.minLength(4)]],
      email: ['',[Validators.required,Validators.minLength(4)]],      
      password:['', Validators.required],      
  
      });

      }

      save(admin) {
        console.log(admin.username);
        this.admin=JSON.parse(localStorage.getItem("admin"))|| [];  
        this.admin.push(admin);
        localStorage["admin"] = JSON.stringify(this.admin);
        this.router.navigate(['/login']); 

        
      }
}

