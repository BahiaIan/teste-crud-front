import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RequisicaoService } from './service/requisicao.service';

export interface Funcioanrio {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  nis: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'teste-crud';

  constructor(
    private requisicaoService: RequisicaoService,
  ) { }

  public funcionarios: Array<any> = []
  public funcionario: any = {};
  public showCadastro = false;

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource: any;

  ngOnInit() {
    this.buscar();
    console.log(this.dataSource);

  }

  buscar() {
    this.requisicaoService.buscar('funcionario').then(response => {
      this.funcionarios = response;
      this.dataSource = new MatTableDataSource<Funcioanrio>(response);
    }).catch(err => console.log(err.message));
  }

  salvar() {
    this.requisicaoService.salvar('funcionario', this.funcionario).then(_ => {
      this.voltar();
    }).catch(_ => alert('Houve um erro, verifique os campos e tente novamente'));
  }

  editar() {
    this.requisicaoService.editar('funcionario', this.funcionario).then(_ => {
      this.voltar();
    }).catch(_ => alert('Houve um erro, verifique os campos e tente novamente'));
  }

  deletar() {
    this.requisicaoService.deletar(`funcionario/${this.funcionario.id}`).then(_ => {
      this.voltar();
    }).catch(err => console.log(err.message));
  }

  cadastrar() {
    this.showCadastro = true;
  }

  voltar() {
    this.showCadastro = false;
    this.funcionario = {};
    this.buscar();
  }

  showEdicao(event: any) {
    this.funcionario = event;
    this.showCadastro = true;
  }
}
