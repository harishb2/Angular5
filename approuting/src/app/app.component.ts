import { Component } from '@angular/core';
import { StudentService } from './student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user  :any;
  constructor(
    private _studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this._studentService.user.subscribe(res => {
      this.user = res;
    });
    
  }
   logout() {
   localStorage.removeItem('user'); 
   this._studentService.user.next(null); 
    this.router.navigate(['/login']);
   }
  
}
