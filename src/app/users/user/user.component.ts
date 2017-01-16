import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';
import { User } from '../../stores/interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: Observable<User>;
  constructor(
    private userStore: UserStoreService,
    private route: ActivatedRoute
  ) {
      this.user = this.userStore.item;
      console.log('user:', this.user)
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userStore.find(params['nickname']);
    })
  }

}
