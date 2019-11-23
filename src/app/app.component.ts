import { Component, OnInit } from '@angular/core';
import data1 from '../data/data1.json';
import data2 from '../data/data2.json';
import data3 from '../data/data3.json';
import data4 from '../data/data4.json';
import data5 from '../data/data5.json';
import data6 from '../data/data6.json';
import data7 from '../data/data7.json';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Logs } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data: any[] = [];

  constructor() { };


  ngOnInit(): void {
    data1.map(d => this.data.push(d));
    data2.map(d => this.data.push(d));
    data3.map(d => this.data.push(d));
    data4.map(d => this.data.push(d));
    data5.map(d => this.data.push(d));
    data6.map(d => this.data.push(d));
    data7.map(d => this.data.push(d));
    this.collectionSize = this.data.length;
    this.dadosFiltro = this.data;
    this.quantidade = this.dadosFiltro.length;
  }

  page = 1;
  pageSize = 30;
  collectionSize = 0;
  sexos: any = [
    { name: 'Todos', code: 'T' },
    { name: 'Masculino', code: 'M' },
    { name: 'Feminino', code: 'F' },
  ];
  sexo = "T";
  dadosFiltro: any[] = [];
  cidade = "";
  partido = "";
  quantidade = 0;

  filter() {
    console.log(this.sexo);
    switch (this.sexo) {
      case "F":
        this.dadosFiltro = this.data
          .filter((f, i) => {
            console.log(this.data);
            if (f.dadosDeputado.dados.sexo === "F") {
              return ({ id: i + 1, ...f })
            }
          })
        this.quantidade = this.dadosFiltro.length;
        break;
      case "M":
        this.dadosFiltro = this.data
          .filter((f, i) => {
            if (f.dadosDeputado.dados.sexo === "M") {
              return ({ id: i + 1, ...f })
            }
          })
        this.quantidade = this.dadosFiltro.length;
        break;
      default:
        this.dadosFiltro = this.data
          .map((f, i) => ({ id: i + 1, ...f }))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        this.quantidade = this.dadosFiltro.length;
        break;
    }
  }
  pesquisaCidade() {
    if (this.cidade === "") {
      this.dadosFiltro = this.data
        .map((f, i) => ({ id: i + 1, ...f }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

      this.quantidade = this.dadosFiltro.length;
    } else {
      this.dadosFiltro = this.data
        .filter((f, i) => {
          if (f.dadosDeputado.dados.ultimoStatus.siglaUf === this.cidade) {
            return ({ id: i + 1, ...f })
          }
        })

      this.quantidade = this.dadosFiltro.length;
    }
  }
  pesquisaPartido() {
    if (this.partido === "") {
      this.dadosFiltro = this.data
        .map((f, i) => ({ id: i + 1, ...f }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      this.quantidade = this.dadosFiltro.length;
    } else {
      this.dadosFiltro = this.data
        .filter((f, i) => {
          if (f.dadosDeputado.dados.ultimoStatus.siglaPartido === this.partido) {
            return ({ id: i + 1, ...f })
          }
        })
      this.quantidade = this.dadosFiltro.length;
    }
  }
}
