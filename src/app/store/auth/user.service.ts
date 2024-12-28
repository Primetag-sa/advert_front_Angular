// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: { email: string, password: string,countUser: number,countWebsite:number,amt:number ,desc :string } = { email: '', password: '',countUser : 0,countWebsite:0,amt:0,desc: '' };

  // Store user data
  setUserData(email: string, password: string,countUser: number,countWebsite:number,amt:number,desc:string ): void {
    debugger
    this.userData = { email, password ,countUser,countWebsite,amt,desc};
  }

  // Retrieve user data
  getUserData(): { email: string, password: string,countUser: number,countWebsite:number,amt:number,desc:string } {
    return this.userData;
  }
}
