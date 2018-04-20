import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig,ToastContainerDirective} from 'angular5-toaster';
import { ToastrService } from 'ngx-toastr';
import { Student } from '../student-list/Student';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {
  public students=[];
  mesg='';
  userFormgroup: FormGroup;
  public summaries: any[];
  Summaries = ["C", "C++", "Java","DataStructures"];
  public i=0;
  k=new Date;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _studentService: StudentService,
    private toastr: ToastrService,
  ) { 
      this.createForm();
  }
    
  createForm() {
    this.userFormgroup = this.formBuilder.group({
      id:[this._studentService.uuid()],
      date:[new Date],      
      username: ['',[Validators.required,Validators.minLength(4)]],
      firstname: ['',[Validators.required,Validators.minLength(4)]],
      lastname: ['',[Validators.required,Validators.minLength(4)]],
      email:['', [Validators.required, this.isEmailValid('email')]],
      password: ['',[Validators.required,Validators.minLength(4)]],
      address: this.formBuilder.group({        
        street: ['', Validators.required],
        pin: ['', Validators.required],
        country: ['', Validators.required]
      }),
      subjects: this.formBuilder.array([]),   
      });
  }


  popToast() {
    this.toastr.success('k', 'Success!', {
      timeOut: 1800,
      positionClass: 'toast-top-center',
      closeButton:true,      
    });
  }


  isEmailValid(control) {
    return control => {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(control.value) ? null : { invalidEmail: true };
    }
  }

  ngOnInit() {       
    let id: any = this.route.snapshot.paramMap.get('id');    
      if (id) {
        this.mesg= 'edit';
        this._studentService.getHero(id).subscribe((hero:any) => {          
          this.userFormgroup.patchValue(hero, { onlySelf: true });
          hero.subjects.forEach(element => {
            this.addSubClick(element);                      
          });
         });
      };
  }

   addstudent(students) {
    console.log(students.subjects);
    let subs=[];
    for(let sub of students.subjects) {
      subs.push(sub.name)      
    }


    let newsubs = new Set;
    for (let s of subs) {
      newsubs.add(s);     
    } 
    
    if(subs.length == newsubs.size){
      console.log("true");
      this._studentService.addStudents(this.userFormgroup.value) .subscribe(hero => {
        this.students.push(hero);
        this.mesg = "saved Succesfully";
        this.toastr.success('Saved!', 'Toastr fun!');
        this.createForm();
      }, e => {
        this.toastr.error('Failed!', 'Toastr fun!');
      });       
    }
    else {
      console.log("false");
      this.toastr.error('Failed!', 'subjects should not be repeat');     
    }
    
   
    
/*    this._studentService.addStudents(this.userFormgroup.value) .subscribe(hero => {
      this.students.push(hero);
      this.mesg = "saved Succesfully";
      this.toastr.success('Saved!', 'Toastr fun!');
      this.createForm();
    }, e => {
      this.toastr.error('Failed!', 'Toastr fun!');
    });   */  
  }

  update(student) {
    let subs=[];
    for(let sub of student.subjects) {
      subs.push(sub.name)      
    }
    let newsubs = new Set;
    for (let s of subs) {
      newsubs.add(s);     
    } 
    if(subs.length == newsubs.size) { 
    this.toastr.success('Saved!', 'Toastr fun!');    
    this._studentService.updatestudent(student);
    }
    else {
      this.toastr.error('Failed!', 'subjects should not be repeat');
    }    
  }

  addSubClick(data?) {     
    if(this.i<this.Summaries.length) {
      let arrayControls = <FormArray>this.userFormgroup.controls.subjects;
      arrayControls.push(this.initSubRow(data));              
      this.i++;                 
    }     
  }

  initSubRow(data?) {
    return this.formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      marks: [data ? data.marks :'', Validators.required]
    });
  } 

  removeSubClick(index) {
    console.log(index);
    this.i--;
    let arrayControls = <FormArray>this.userFormgroup.controls.subjects;
    arrayControls.removeAt(arrayControls.value.findIndex(item => item.id === index));
  }

  goback() {        
    this.router.navigate(['/students']);
  }
}
