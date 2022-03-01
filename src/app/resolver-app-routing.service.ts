import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResolverAppRouting implements Resolve<any> {

  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log(`ResolverAppRouting`, {route, state});
    return this.hijack();
  }

  hijack(hijacker?) {
    return of(true).pipe(
      tap(() => {
        if (hijacker) {
          console.log(`hijacking ResolverAppRouting from ${hijacker}`);
        }
      }),
      delay(1000)
    );
  }
}
