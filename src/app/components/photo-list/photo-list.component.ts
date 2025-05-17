import { Component, HostListener, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: string[] = [];
  loading = false;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadMorePhotos();
  }

  loadMorePhotos(): void {
    if (this.loading) return;
    this.loading = true;
    setTimeout(() => {
      this.photoService.getRandomPhotos(10).subscribe(newPhotos => {
        this.photos.push(...newPhotos);
        this.loading = false;
      });
    }, Math.random() * 100 + 200); // delay 200–300ms
  }

  encode(url: string): string {
    return encodeURIComponent(url);
  }

  @HostListener('window:scroll', [])
  @HostListener('window:wheel', [])
  onScroll(): void {
    const bottomReached = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100);
    if (bottomReached) this.loadMorePhotos();
  }

  addToFavorites(url: string): void {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favs.includes(url)) {
      favs.push(url);
      localStorage.setItem('favorites', JSON.stringify(favs));
    }
  }

}