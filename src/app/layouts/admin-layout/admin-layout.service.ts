import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLayoutService {

  isloadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

constructor() { }

}
