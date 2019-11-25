import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  constructor(private service: AppService) {}

  sexos: { name: string, code: string }[] = [
    { name: 'Todos', code: 'T' },
    { name: 'Masculino', code: 'M' },
    { name: 'Feminino', code: 'F' },
  ];
  sexo = 'T';
  estado = '';
  partido = '';
  data: any[] = [];
  page = 1;
  pageSize = 30;
  collectionSize = 0;
  filtro: {sexo: string, estado: string, partido: string } = {
    sexo: this.sexo,
    estado: this.estado,
    partido: this.partido
  };
  quantidade = 0;

  ngOnInit() {

    const initialData = this.service.resetaDados();
    this.collectionSize = initialData.length;
    this.data = initialData;
  }

  filter() {
    this.filtro = {
      sexo: this.sexo,
      estado: this.estado.toUpperCase(),
      partido: this.partido.toUpperCase()
    };
    this.data = this.service.filtrar(this.filtro);
    this.quantidade = this.data.length;
  }

  resetFiltro(){
    this.data =  this.service.resetaDados();
  }
  get dados(){
    this.quantidade = this.data.length;
    return this.data.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
  }
}
