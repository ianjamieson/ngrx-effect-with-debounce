import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { loadClients, networkRequest } from './client.actions';

import { ClientEffects } from './client.effects';

describe('ClientEffects', () => {
  let actions$: Observable<any>;
  let effects: ClientEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<ClientEffects>(ClientEffects);
  });

  it('dispatch networkRequest', () => {
    const scheduler = getTestScheduler();
    scheduler.run(() => {
      // marbles
      const actions =  'a 500ms a b';
      const expected = '500ms a - 500ms b';

      actions$ = hot(actions, {
        a: loadClients(),
        b: loadClients(),
      });

      expect(effects.loadClients$).toBeObservable(cold(expected, {
        a: networkRequest(),
        b: networkRequest(),
      }));
    });
  });
});
