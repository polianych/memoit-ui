import { Component, OnInit, Input } from '@angular/core';
import { SubscriptionStoreService } from '../../stores/subscription-store.service';

@Component({
  selector: 'app-publisher-subscription-button',
  templateUrl: './publisher-subscription-button.component.html',
  styleUrls: ['./publisher-subscription-button.component.css']
})
export class PublisherSubscriptionButtonComponent implements OnInit {
  @Input('publisherType') publisherType: string;
  @Input('publisherId') publisherId: number;
  @Input('subscriptionId') subscriptionId: number;
  @Input('subscribed') subscribed: boolean = false;
  private isLoading: boolean = false;
  constructor(private subscriptionStore: SubscriptionStoreService) { }

  ngOnInit() {
  }

  onClick() {
    if(this.isLoading){
      return;
    }
    this.isLoading = true;
    if(this.subscribed) {
      this.subscriptionStore.destroy(this.subscriptionId).subscribe( ()=> {
        this.subscriptionId = null;
        this.subscribed = false;
        this.isLoading = false;
      });
    } else {
      this.subscriptionStore.create({
        publisher_type: this.publisherType,
        publisher_id: this.publisherId
      }).subscribe( (v)=> {
        this.subscriptionId = v.id;
        this.subscribed = true;
        this.isLoading = false;
      });
    }
  }



}
