import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, mapTo } from 'rxjs/operators';
import { loadClients, networkRequest } from './client.actions';



@Injectable()
export class ClientEffects {

  public loadClients$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadClients),
      distinctUntilChanged(),
      debounceTime(500),
      mapTo(networkRequest())
    );
  });

  constructor(private actions$: Actions) {}

}
