import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(public authService: AuthService, private router: Router) { }


  logout() {  
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
