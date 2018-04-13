import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { UpdatestudentComponent } from './updatestudent/updatestudent.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: 'editstudent', component: EditstudentComponent},
  { path: 'editstudent/:id', component: EditstudentComponent, canActivate: [AuthGuard] },
  {path:  'register', component: RegisterComponent},
  {path:  'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path:  '',          component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
