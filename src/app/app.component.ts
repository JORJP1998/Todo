import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.isAuth().subscribe(data => {
        if(data) {
          this.router.navigate(['/todo']);
        }else {
          this.router.navigate(['/login']);
        }
      })
  }
}
