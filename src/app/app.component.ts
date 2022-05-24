import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from './services/currencyservice';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  amount: any = 0;
  countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'Australia' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'Brazil' },
    { id: 5, name: 'England' },
  ];
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.contactForm = this.fb.group({
      amount: [null],
      currencyFrom: ['NGN'],
      currencyTo: ['USD'],
    });
  }

  submit() {
    console.log('Form Submitted');
    console.log(this.contactForm.value);

    this.currencyService.getCurrency().subscribe(
      (res: any) => {
        this.displayResults(res, this.contactForm.value);
        console.log(res.rates, 'res');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  displayResults(currency, form) {
    console.log(currency, form);
    let fromRate = currency.rates[form.currencyFrom];
    let toRate = currency.rates[form.currencyTo];
    this.amount = ((toRate / fromRate) * form.amount).toFixed(2);
  }
}
