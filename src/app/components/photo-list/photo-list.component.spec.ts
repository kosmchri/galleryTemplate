import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PhotoListComponent } from './photo-list.component';
import { PhotoService } from 'src/app/services/photo.service';
import { of } from 'rxjs';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let mockPhotoService: any;

  beforeEach(() => {
    mockPhotoService = {
      getRandomPhotos: jasmine.createSpy().and.returnValue(of(['url1', 'url2', 'url3']))
    };

    TestBed.configureTestingModule({
      declarations: [PhotoListComponent],
      providers: [{ provide: PhotoService, useValue: mockPhotoService }]
    });

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load photos on init', fakeAsync(() => {
    fixture.detectChanges(); 
    tick(300);               
    expect(component.photos.length).toBeGreaterThan(0);
    expect(component.photos).toEqual(['url1', 'url2', 'url3']);
  }));
});