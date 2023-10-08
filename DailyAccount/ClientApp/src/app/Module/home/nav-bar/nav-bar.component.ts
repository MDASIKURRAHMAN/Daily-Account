import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  username = localStorage.getItem('LastUserName') ?? 'Please Logged In';
  activeRoute = '';

  constructor(private accountService: AccountService, private router: Router) {}

  logout() {
    this.accountService.logout();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  // Helper function to check if the route is active
  isActiveRoute(route: string): boolean {
    return this.activeRoute.includes(route);
  }
}
