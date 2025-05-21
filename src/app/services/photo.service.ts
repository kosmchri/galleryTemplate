import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}

  getRandomPhotos(count: number): Observable<string[]> {
    const usedIds = new Set<number>();
    const urls: string[] = [];

    while (urls.length < count) {
      const id = Math.floor(Math.random() * 600); 
      if (!usedIds.has(id)) {
        usedIds.add(id);
        urls.push(`https://picsum.photos/id/${id}/600/400`);
      }
    }

    return of(urls);
  }
}