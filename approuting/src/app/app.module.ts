import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { HttpClient} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule, ToastrService  } from 'ngx-toastr';;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentService } from './student.service';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { UpdatestudentComponent } from './updatestudent/updatestudent.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

export function tokenGetter() {
  return localStorage.getItem("auth_token");
}
@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    DashboardComponent,
    EditstudentComponent,
    UpdatestudentComponent,
    RegisterComponent,
    LoginComponent,   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3000']
      }
    })
  ],
  providers: [ StudentService, AuthGuardService, AuthService, ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    } 
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
