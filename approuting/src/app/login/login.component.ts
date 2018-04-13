import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormgroup: FormGroup;

  public admin=[];
  user:any;

  constructor(
    private authGuard:AuthGuard,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _studentService: StudentService
  ) {  
     
        this.createForm();
   }

  ngOnInit() {
    if(this.authGuard.canActivate()) {
      this.router.navigate(['dashboard']);
    }
  }

  createForm() {    
    this.userFormgroup = this.formBuilder.group({            
      username: ['',[Validators.required,Validators.minLength(2)]],            
      password:['', [Validators.required,Validators.minLength(2)]],    
  
      });

      }

  loginform(login) {    
    this._studentService.loginCheck(login);   

    
  }

}
