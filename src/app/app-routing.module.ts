import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';

const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}