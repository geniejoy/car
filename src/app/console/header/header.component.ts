import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// import { AuthenticationService } from '@auth/login-services/authentication.service';
import { SidenavComponent } from '@console/sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @Output() toggleEvent = new EventEmitter();
  @Input() sidenavCom: SidenavComponent;
  // constructor(private authenticationService: AuthenticationService, private router: Router) { }
  constructor(private router: Router) { }

  ngOnInit() { }

  logout() {
    // this.authenticationService.logout();
    // this.router.navigate(['/login']);
  }
}
