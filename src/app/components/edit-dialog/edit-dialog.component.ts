import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from '../../interfaces/pessoa';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    MatDatepickerModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  pessoaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pessoa: Pessoa },
    private fb: FormBuilder
  ) {
    this.pessoaForm = this.fb.group({
      nome: [data.pessoa.nome, Validators.required],
      dataNascimento: [data.pessoa.dataNascimento, Validators.required],
      email: [data.pessoa.email, [Validators.required, Validators.email]],
      cpf: [data.pessoa.cpf, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if (this.pessoaForm.valid) {
      this.dialogRef.close(this.pessoaForm.value);
    }
  }
}
