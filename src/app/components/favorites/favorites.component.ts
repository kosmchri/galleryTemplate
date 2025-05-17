import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: string[] = [];

  ngOnInit(): void {
    this.loadFavorites();
  }

  encode(url: string): string {
    return encodeURIComponent(url);
  }

  loadFavorites(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  removeFromFavorites(photo: string): void {
    this.favorites = this.favorites.filter(fav => fav !== photo);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}