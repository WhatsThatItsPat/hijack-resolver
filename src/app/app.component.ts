import { Component } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { delay, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  loading: HTMLIonLoadingElement;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
  ) {

    /**
     * This is just something close to mimicing loading spinners.
     */
    this.router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((routerEvent: RouterEvent) => {
      // console.log(event);
      switch (true) {
        case routerEvent instanceof NavigationStart: {
          this.presentLoading();
          break;
        }

        case routerEvent instanceof NavigationEnd:
        case routerEvent instanceof NavigationCancel:
        case routerEvent instanceof NavigationError: {
          this.dismissLoading();
          break;
        }
        default: {
          break;
        }
      }
    });

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await this.loading.present();
  }

  async dismissLoading() {
    /**
     * Hacking in a pause because the first page can happen so
     * fast that it's dismissed before created.
     */
    await new Promise(resolve => setTimeout(resolve, 200));
    await this.loading.dismiss();
  }
}
