import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserStoreService } from '../../stores/user-store.service';
import { User } from '../../stores/interfaces/user.interface';

@Component({
  selector: 'app-discover-users',
  templateUrl: './discover-users.component.html',
  styleUrls: ['./discover-users.component.css']
})
export class DiscoverUsersComponent implements OnInit {
  public users: Observable<User[]>;
  constructor(
    private userStore: UserStoreService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

    }


  ngOnInit() {
    this.users = this.userStore.items;
    this.userStore.resetStore();
    this.userStore.findAll();
  }

  onScrollDown() {
    this.userStore.getNextPage();
  }

  onSearchChange(query) {
    if (this.userStore.isItemsLoading) {
      return;
    }
    this.userStore.resetStore();
    this.userStore.findAll({search_query: query});
  }

}
