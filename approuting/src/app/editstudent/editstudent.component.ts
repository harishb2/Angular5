import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student-list/Student';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _studentService: StudentService
  ) { 
      this.createForm();
  }
    
  createForm() {
    this.userFormgroup = this.formBuilder.group({
      id:[this._studentService.uuid()],      
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
    this._studentService.addStudents(this.userFormgroup.value) .subscribe(hero => {
      this.students.push(hero);
    });;
    this.mesg = "saved Succesfully"; 
    this.router.navigate(['/students']); 
  }

  update(student) {    
    console.log(student);
    this._studentService.updatestudent(student);
    
  }

  addSubClick(data?) {
    let arrayControls = <FormArray>this.userFormgroup.controls.subjects;
    arrayControls.push(this.initSubRow(data));
  }

  initSubRow(data?) {
    return this.formBuilder.group({
      name: [data ? data.name : '', Validators.required],
      marks: [data ? data.marks :'', Validators.required]
    });
  } 

  removeSubClick(index) {
    console.log(index);
    let arrayControls = <FormArray>this.userFormgroup.controls.subjects;
    arrayControls.removeAt(arrayControls.value.findIndex(item => item.id === index));
  }

  goback() {        
    this.router.navigate(['/students']);
  }
}
