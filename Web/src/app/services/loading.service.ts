import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadedObs: Observable<boolean> = this.loaded.asObservable();

  constructor() { }

  setLoaded(state: boolean) {
    this.loaded.next(state);
  }
}
