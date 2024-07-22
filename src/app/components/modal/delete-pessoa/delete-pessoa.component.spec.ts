import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePessoaComponent } from './delete-pessoa.component';

describe('DeletePessoaComponent', () => {
  let component: DeletePessoaComponent;
  let fixture: ComponentFixture<DeletePessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePessoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
