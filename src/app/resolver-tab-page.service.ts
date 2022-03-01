import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { ResolverAppRouting } from './resolver-app-routing.service';

@Injectable({ providedIn: 'root' })
export class ResolverTabPage implements Resolve<any> {

  constructor(
    private resolverAppRouting: ResolverAppRouting
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log(`ResolverTabPage`, {route, state});
    return of(true).pipe(
      switchMap(() => this.resolverAppRouting.hijack('ResolverTabPage')),
      delay(1000)
    );
  }
}
