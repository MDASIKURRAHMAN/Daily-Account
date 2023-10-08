import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = "Dummy Name";
  userEmail: string = "Dummy Email";
  userImage: string = "Dummy Image";
  user: any;
  loggedIn: any;

  constructor(private accountService: AccountService, 
              private socialAuthService: SocialAuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('LastUserName') ?? "no name found";
    this.userEmail = localStorage.getItem('LastUserEmail') ?? "no email found";
    this.userImage = localStorage.getItem('LastUserImage') ?? "no image found";


    this.socialAuthService.authState.subscribe((socialUser: SocialUser) => {

      if(socialUser) {
        this.accountService.login(socialUser);
      } else {
        this.router.navigateByUrl("/account/login");
      }
    })
  }
}
