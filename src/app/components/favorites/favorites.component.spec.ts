import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { RouterTestingModule } from '@angular/router/testing';



describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites from localStorage on init', () => {
    const mockFavorites = ['url1', 'url2'];
    localStorage.setItem('favorites', JSON.stringify(mockFavorites));

    component.loadFavorites();

    expect(component.favorites).toEqual(mockFavorites);
  });

  it('should remove a photo from favorites', () => {
    const mockFavorites = ['url1', 'url2'];
    localStorage.setItem('favorites', JSON.stringify(mockFavorites));
    component.loadFavorites();

    component.removeFromFavorites('url1');

    expect(component.favorites).toEqual(['url2']);
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    expect(saved).toEqual(['url2']);
  });
});