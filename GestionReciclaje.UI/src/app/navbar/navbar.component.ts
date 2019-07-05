import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  
  
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {  
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
