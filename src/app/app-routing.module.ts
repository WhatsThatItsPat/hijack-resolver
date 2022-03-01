import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResolverAppRouting } from './resolver-app-routing.service';

const routes: Routes = [
  { path: '', redirectTo: 'outside', pathMatch: 'full' },
  {
    path: 'outside',
    loadChildren: () => import('./outside/outside.module').then( m => m.OutsidePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    resolve: [ResolverAppRouting]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
