import { Component } from '@angular/core';
import { AuthService } from '../auth/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errors: any;
  constructor(private authService: AuthService, private router: Router) {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home'])
    }
  }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe((response : any) => {
        debugger
        if(response.data.login.success){
          localStorage.setItem('token', response.data.login.token)
          this.router.navigate(['/home'])
        }else{
          console.log(response)
          this.errors = response.data.register.errors
        }
      });
  }
}
