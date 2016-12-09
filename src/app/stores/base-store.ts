import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth/services/auth.service';
import 'rxjs/add/operator/map';

export abstract class BaseStore {
  private _items: BehaviorSubject<Object[]> = new BehaviorSubject([]);
  public items: Observable<Object[]> = this._items.asObservable();
  public isItemsLoading: boolean = false;

  private currentPage: BehaviorSubject<number> = new BehaviorSubject(1);
  private totalPages: BehaviorSubject<number> = new BehaviorSubject(0);
  private allQuery: any = {};
  protected store_endpoint: string;
  protected singular_key: string;
  protected plural_key: string;

  constructor(protected authService: AuthService) {
  }

  create(values: Object) {
    let body = JSON.stringify({ [this.singular_key]: values });
    let response = this.authService
      .post(this.store_endpoint, body)
    response.subscribe(response => {
        let _p = this._items.getValue()
        _p.unshift(response.json()[this.singular_key])
        this._items.next(_p)
    });
    return response.map((response) => { return response.json()[this.singular_key]; });
  }

  destroy(id: string|number) {
    let response = this.authService.delete(this.store_endpoint + '/' + id)
    response.subscribe(response => {
        console.log('Destroyed', this.singular_key, id);
        //TODO shift element by id
        // let _p = this._items.getValue()
        // _p.unshift(response.json()[this.singular_key])
        // this._items.next(_p)
    });
    return response;
  }

  findAll(query?: any) {
    if (query){
      this.allQuery = query;
    }
    if (query && query.hasOwnProperty('page') && query.page > this.totalPages.getValue()){
      return;
    }
    this.isItemsLoading = true;
    this.authService
      .get(this.store_endpoint, query)
      .subscribe( (response) => {
        this.isItemsLoading = false;
        let _p = this._items.getValue()
        _p = _p.concat(response.json()[this.plural_key])
        this._items.next(_p);
        this.currentPage.next(response.json().meta.current_page);
        this.totalPages.next(response.json().meta.total_pages);
      }, (error) => { console.log(error); this.isItemsLoading = false; })
  }

  find(id: string|number): Observable<any>{
    return this.authService
      .get(this.store_endpoint + '/' + id).map((response) => { return response.json()[this.singular_key]; })
  }

  getNextPage() {
    this.allQuery.page = this.currentPage.getValue() + 1;
    this.findAll(this.allQuery);
  }

  resetStore() {
    this.allQuery = { page: 1}
    this._items.next([]);
    this.currentPage.next(1);
    this.totalPages.next(0);
    this.isItemsLoading = false;
  }
}
