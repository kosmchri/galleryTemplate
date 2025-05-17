import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoDetailComponent } from './photo-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PhotoDetailComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  const mockUrl = 'https://picsum.photos/id/100/600/400';
  const encodedUrl = encodeURIComponent(mockUrl);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => encodedUrl
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    localStorage.clear(); // clean slate
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should decode URL and assign to photoUrl', () => {
    expect(component.photoUrl).toBe(mockUrl);
  });

  it('should add photo to favorites if not already present', () => {
    component.addToFavorites();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).toContain(mockUrl);
    expect(component.isFavorite).toBeTrue();
  });

  it('should not add photo again if already in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockUrl]));
    component.addToFavorites(); // re-add
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites.length).toBe(1);
  });

  it('should remove photo from favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([mockUrl]));
    component.removeFromFavorites();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(favorites).not.toContain(mockUrl);
    expect(component.isFavorite).toBeFalse();
  });
});