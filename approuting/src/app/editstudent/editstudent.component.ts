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
    this._studentService.getHero(id).subscribe((hero:any) => {
      this.students=hero.users
      if (id) {
        const index = this.students.findIndex(item => item.id === id);
        this.userFormgroup.patchValue(this.students[index], { onlySelf: true });
        let subNames:{"1":"java","2":"angular"}
      }
    });
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
    this.router.navigate(['/students']);  
  }

  addSubClick() {
    let arrayControls = <FormArray>this.userFormgroup.controls.subjects;
    arrayControls.push(this.initSubRow());
  }

  initSubRow() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      marks: ['', Validators.required]
    });
  }

  removeSubClick(index) {
    console.log(index);
    let arrayControls = <FormArray>this.userFormgroup.controls.subjects;
    arrayControls.removeAt(arrayControls.value.findIndex(item => item.id === index));
  }
}
