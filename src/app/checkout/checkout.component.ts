import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(private _CartService: CartService, private ar: ActivatedRoute) {}

  loading = false;

  backendMsg = null;

  FormAddress = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
  });
  onlinePayemtn(form: any) {
    this.loading = true;
    if (form.valid) {
      let cid = this.ar.snapshot.params['cartId'];
      this._CartService
        .checkOutSession(cid, form.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.loading = false;
            location.href = response.session.url;
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
          },
        });
    }
  }
}
