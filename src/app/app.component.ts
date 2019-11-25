import { Component, OnInit } from '@angular/core';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Logs } from 'selenium-webdriver';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  constructor(private service: AppService) {
  };
  private sexos: { name: string, code: string }[] = [
    { name: 'Todos', code: 'T' },
    { name: 'Masculino', code: 'M' },
    { name: 'Feminino', code: 'F' },
  ];
  sexo = "T";
  cidade = "";
  partido = "";
  data: any[] = [];
  ngOnInit() { this.data = this.service.resetaDados() };
  filter() {
    this.data = this.service.filter(this.sexo);
  }
  pesquisaCidade() { this.data = this.service.pesquisaCidade(this.cidade); }
  pesquisaPartido() { this.data = this.service.pesquisaPartido(this.partido); }
}
