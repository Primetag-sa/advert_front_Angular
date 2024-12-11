import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-snapchat-callback',
  templateUrl: './snapchat-callback.component.html',
  styleUrl: './snapchat-callback.component.scss'
})
export class SnapchatCallbackComponent {

  user: any;
  accounts: any;

  constructor(private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {

    /* this.route.queryParams.subscribe(( params:any )=> {
      const userParam = params['user'];
      const accountsParam = params['acounts'];

      if (userParam) {
        this.user = JSON.parse(decodeURIComponent(userParam));
        console.log(this.user);
      
      }

      if (accountsParam) {
        this.accounts = JSON.parse(decodeURIComponent(accountsParam));
        console.log(this.accounts);
      }
    }); */

    // Parse the user data from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    const acounts = urlParams.get('acounts');

    // console.log(urlParams.getAll);

    this.router.navigate(['agency/snapchat']);

    /* if (user) {
      // Save the user data (you can store it in localStorage or sessionStorage)
      localStorage.setItem('snapchatUser', user);
      console.log(user);
      console.log(acounts);
      localStorage.setItem('snapchatAcounts', acounts??'');

      this.router.navigate(['agency/snapchat']);

      // Optionally redirect to a profile page or another route
      // this.router.navigate(['agency/snapchat']); // Example: navigating to a profile page
    } else {
      console.error('User data not found in the URL.');
    }
    this.router.navigate(['agency/snapchat']); */
    
  }

  /* constructor( private router: Router) {}

  ngOnInit(): void {
    // Handle the callback and store the user info
    console.log('handleCallback')
    this.handleCallback();
  }
  handleCallback() {
    // Parse user data from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    console.log(user);
    if (user) {
      // Store user data in local storage or a state management system
      localStorage.setItem('snapchatUser', user);
      
      // Navigate to another page or handle user data display
      this.router.navigate(['/profile']); // Example: redirecting to a profile page
    }
  } */
}
