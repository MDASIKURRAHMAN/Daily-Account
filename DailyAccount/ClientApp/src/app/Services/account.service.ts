import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/ILoginDetails';
import { ProfileDetails } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = "https://localhost:7188/api/account/";
  user?: SocialUser;
  loggedIn = false;
  newUser = false;
  profileDetails?: ProfileDetails;

  constructor(private http: HttpClient,
              private router: Router
              ) { 
                  this.checkForPreviousLoginDetails(); 
                }


  login(socialUser: SocialUser, redirectTo: string | null = null) {

    let loginUrl = this.baseUrl + "login";

    this.user = socialUser;
    let formData = new FormData();
    formData.append('firstName', socialUser.firstName);
    formData.append('lastName', socialUser.lastName);
    formData.append('name', socialUser.name);
    formData.append('email', socialUser.email);
    formData.append('id', socialUser.id);
    formData.append('idToken', socialUser.idToken);
    formData.append('provider', socialUser.provider);
    formData.append('photoUrl', socialUser.photoUrl);

    this.http.post<LoginResponse>(loginUrl, formData).subscribe((loginResponse: LoginResponse) => {
      this.loggedIn = true;
      localStorage.setItem('LastUserName', socialUser.name);
      localStorage.setItem('LastUserEmail', socialUser.email);
      localStorage.setItem('LastUserImage', socialUser.photoUrl);
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('User', JSON.stringify(socialUser));
      this.router.navigateByUrl(redirectTo ?? "/");
    })
  }

  checkForPreviousLoginDetails() {
    let user = localStorage.getItem('User');
    let token = localStorage.getItem('token');
    if (user != null && token) {
      this.user = JSON.parse(user);
      this.loggedIn = true;
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('User');
    localStorage.removeItem('token');
    window.location.href = "/account/login";
  }

}
