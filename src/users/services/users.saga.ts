import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { mergeMap, Observable, of } from 'rxjs';
import { SendRegistrationEmailCommand } from '../commands';
import { UserCreatedEvent } from '../events';

@Injectable()
export default class UsersSaga {
  @Saga()
  userRegistered = (events$: Observable<any>) => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      mergeMap((event) => of(new SendRegistrationEmailCommand(event.user))),
    );
  };
}
