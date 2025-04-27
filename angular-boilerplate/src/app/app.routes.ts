import type { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { appRoutes } from './shared/constants/routes.constant';

export const routes: Routes = [
  {
    path: appRoutes.empty,
    component: WelcomeComponent,
  },
];
