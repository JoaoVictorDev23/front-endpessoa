import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Pessoa } from '../../interfaces/pessoa';
import { PessoaService } from '../../services/pessoa.service';
import { CommonModule } from '@angular/common';
import { CpfPipe } from '../../pipe/cpf.pipe';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-pessoas',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    CpfPipe,
    MatIcon
  ],
  templateUrl: './list-pessoas.component.html',
  styleUrls: ['./list-pessoas.component.css'] // Corrigido de styleUrl para styleUrls
})
export class ListPessoasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'dataNascimento', 'email', 'cpf', 'actions'];
  dataSource = new MatTableDataSource<Pessoa>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pessoaService: PessoaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar // Adicionando MatSnackBar ao construtor
  ) { }

  ngOnInit() {
    this.pessoaService.getAllPessoas().subscribe(pessoas => {
      this.dataSource.data = pessoas;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(element: Pessoa): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '40%',
      height: '70%',
      data: { pessoa: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pessoaService.updatePessoa(element.id, result).subscribe(() => {
          this.snackBar.open('Pessoa atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.ngOnInit(); // Recarrega a lista de pessoas
        });
      }
    });
  }

  openDeleteDialog(element: Pessoa): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { pessoa: element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pessoaService.deletePessoa(element.id).subscribe(() => {
          const snackBarRef = this.snackBar.open('Pessoa deletada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          // Recarregar a página somente após o snackbar ser fechado
          snackBarRef.afterDismissed().subscribe(() => {
            location.reload(); // Recarrega a Página
          });
        });
      }
    });
  }
}
