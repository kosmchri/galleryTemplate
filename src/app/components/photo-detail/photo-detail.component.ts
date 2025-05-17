import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  photoUrl: string | undefined;
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('id');
    this.photoUrl = raw ? decodeURIComponent(raw) : undefined;

    if (this.photoUrl) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.isFavorite = favorites.includes(this.photoUrl);
    }
  }

  addToFavorites(): void {
    if (!this.photoUrl) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(this.photoUrl)) {
      favorites.push(this.photoUrl);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.isFavorite = true;
      alert('Added to favorites!');
    }
  }

  removeFromFavorites(): void {
    if (!this.photoUrl) return;

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter((fav: string | undefined) => fav !== this.photoUrl);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.isFavorite = false;
    alert('Removed from favorites!');
  }
}