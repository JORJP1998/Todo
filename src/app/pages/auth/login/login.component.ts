import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel('', '', '', '')
  error_message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  userLogin () {
    return this.authService.login(this.user.email, this.user.password).subscribe(data => {
      let data_split = data.split(' ');
      if (data_split[0] === 'Bearer') {
        localStorage.setItem('auth_token', data);
        this.router.navigate(['/todo']);
      }
      this.error_message = data
      setTimeout(() => {
        this.error_message = ''
      }, 5000);
    })
  }
  ngOnInit(): void {
  }

}
