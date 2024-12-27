import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../store/auth/user.service';
import { Store } from '@ngrx/store';
import * as authActions from '../../../store/auth/auth.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentData: any;   
  errorMessage: string | null = null; 
  description: string = 'Payment for services';
  countUser: number = 50; 
  countWebsite: number = 10; 
  amt: number = 100;
  constructor(private userService: UserService, private store: Store,private http: HttpClient) {}

  ngOnInit(): void {
    this.amt = this.userService.getUserData().amt
    this.countWebsite = this.userService.getUserData().countWebsite
    this.countUser = this.userService.getUserData().countUser
    this.description = this.userService.getUserData().desc

    this.initializeTapPayment();
  }

private credentials = {
    test: {
      publicKey: 'pk_test_LRSpP4m9ZlChjybVkvYuiIfT',
      secretKey: 'sk_test_tUBO1hgMlYVJk4DAHpi0Pcfz'
    },
    production: {
      publicKey: 'pk_live_Ovhrm9BazFynoAqWHxjIQ3u5',
      secretKey: 'sk_live_op9syjrgA15JeVDTtKOSWX6l'
    }
  };



  private getPublicKey(): string {
    return this.credentials[this.environment].publicKey;
  }

  private environment: 'test' | 'production' = 'test';

  initializeTapPayment(): void {
    const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } = window.CardSDK;
    const publicKey = this.getPublicKey();
    
    const { unmount } = renderTapCard('card-sdk-id', {
      publicKey: publicKey,
      merchant: {
        id: '38639136'
      },
      transaction: {
        amount: this.amt, 
        currency: Currencies.SAR,
        description: this.description, 
        metadata: {
          countUser: this.countUser,
          countWebsite: this.countWebsite
        }
      },
      acceptance: {
        supportedBrands: ['AMERICAN_EXPRESS', 'VISA', 'MASTERCARD', 'MADA'],
        supportedCards: 'ALL'
      },
      fields: {
        cardHolder: true
      },
      addons: {
        displayPaymentBrands: true,
        loader: true,
        saveCard: true
      },
      interface: {
        locale: Locale.EN,
        theme: Theme.LIGHT,
        edges: Edges.CURVED,
        direction: Direction.LTR
      },
      onReady: () => console.log('onReady'),
      onFocus: () => console.log('onFocus'),
      onBinIdentification: (data: { bin: string; cardType: string }) => console.log('onBinIdentification', data),
      onValidInput: (data: { isValid: boolean }) => console.log('onValidInputChange', data),
      onInvalidInput: (data: { error: string }) => console.log('onInvalidInput', data),
      onError: (data: { error: string }) => {
        console.log('onError', data);
        this.errorMessage = 'Payment failed. Please try again.'; 
        this.sendPaymentResponse(false);

      },
      onSuccess: (data: { paymentToken: string }) => {
        debugger
        console.log('onSuccess', data);
        this.sendPaymentResponse(true, data.paymentToken);
        // this.paymentData = data;  
        // this.store.dispatch(authActions.login({email : this.userService.getUserData().email, password : this.userService.getUserData().password }));
      },
      onChangeSaveCardLater: (isSaveCardSelected: boolean) => console.log(isSaveCardSelected, " :onChangeSaveCardLater")
    });
  }

  submitPayment(): void {
    debugger
    console.log('Payment submitted');
    window.CardSDK.tokenize();
  }
  sendPaymentResponse(paymentResponse: boolean, paymentToken?: string): void {
    debugger
    const apiUrl = environment.apiUrl+'/cofirme-register'; 
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      payment_response: paymentResponse,
   
    };

    this.http.post(apiUrl, body, { headers }).subscribe(
      (response) => {
        debugger
        this.store.dispatch(authActions.login({email : this.userService.getUserData().email, password : this.userService.getUserData().password }));
        console.log('API Response:', response);
      },
      (error) => {
        console.error('Error sending payment response:', error);
      }
    );
  }

}
