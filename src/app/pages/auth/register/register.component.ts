import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UserModel = new UserModel('', '', '', '');
  error_message: string = "";
  created_message: string = "";
  constructor(private authService: AuthService) { }

  userRegister() {
    return this.authService.register(this.user.name, this.user.email, this.user.password, this.user.repeat_password).subscribe(data => {
      let data_split = data.split(' ');
      if(data_split[0] === 'Bearer') {
        localStorage.setItem('auth_token', data);
        this.created_message = 'You have successfully created an account'
      }else {
        this.error_message = data;
        setTimeout(() => {
          this.error_message = '';
        },5000)
      }
    })
  }
  ngOnInit(): void {
  }

}
