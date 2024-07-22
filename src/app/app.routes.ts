import { Routes } from '@angular/router';
import { ListPessoasComponent } from './components/list-pessoas/list-pessoas.component';
import { CadastrarPessoaComponent } from './components/cadastrar-pessoa/cadastrar-pessoa.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

export const routes: Routes = [
  {
    path:'',
    component:SidenavComponent,
    children:[
      {
        path:'pessoas',
        component:ListPessoasComponent
      },
      {
        path:'cadastrar-pessoa',
        component:CadastrarPessoaComponent
      }
    ]
  }

];
