import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { FinishComponent } from './pages/finish/finish.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'play/:id', component: PlayComponent, title: 'Play Quiz' },
  { path: 'finish', component: FinishComponent, title: 'Quiz Results' },
  { path: '**', redirectTo: '' },
];
