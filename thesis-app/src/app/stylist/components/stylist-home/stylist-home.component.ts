import { Component, Input, OnInit } from '@angular/core';

import { RequestService, BookingService} from '../../../services';

@Component({
   selector: 'stylist-home',
   templateUrl: './stylist-home.component.html'
})
export class StylistHomeComponent implements OnInit {
  constructor(
    private requestService: RequestService,
    private bookingService: BookingService
  ) {}

  @Input() stylistProfile;
  public isProfileFetched: boolean = false;
  public bookings: any;

  ngOnInit() {
    this.requestService.getStylistById(2) //hard coded logged in stylist
      .subscribe(
        data => this.stylistProfile = data,
        err => console.log(err)
      );

    this.bookingService.fetchBookingsForStylist(2) // hard coded logged in stylist
      .subscribe(
        data => this.bookings = data,
        err => console.log(err),
        () => this.isProfileFetched = true
      );
  }

  confirmBooking(id: number, index: number) {
    console.log('TODO: color this booking div green');
    this.bookingService.confirmBooking(id)
      .subscribe(
        result => console.log(result),
        err => console.log(err)
      );
  }

  deleteBooking(id: number, index: number) {
    this.bookings.splice(index, 1);
    this.bookingService.deleteBooking(id)
      .subscribe(
        result => console.log(result),
        err => console.log(err)
      );
  }

  completeBooking(id: number, index: number) {
    this.deleteBooking(id, index);
    console.log('TODO: send user a prompt to pay with stripe');
  }

}