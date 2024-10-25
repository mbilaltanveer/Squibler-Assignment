import { Component } from '@angular/core';
import { AuthService } from '../auth/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  username: string = '';
  password1: string = '';
  password2: string = '';
  errors: any;
  constructor(private authService: AuthService, private router: Router) {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home'])
    }
  }

  signup() {
    this.authService.register(this.email, this.username, this.password1, this.password2)
      .subscribe((response: any) => {
        if(response.data.register.success){
          localStorage.setItem('token', response.data.register.token)
          this.router.navigate(['/home'])
        }else{
          console.log(response)
          this.errors = response.data.register.errors
        }
      });
  }
}
