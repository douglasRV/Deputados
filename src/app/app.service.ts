import data1 from '../data/data1.json';
import data2 from '../data/data2.json';
import data3 from '../data/data3.json';
import data4 from '../data/data4.json';
import data5 from '../data/data5.json';
import data6 from '../data/data6.json';
import data7 from '../data/data7.json';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Logs } from 'selenium-webdriver';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class AppService {
    data: any[] = [];

    constructor() {
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
    };
    page = 1;
    pageSize = 30;
    collectionSize = 0;
    sexo = "T";
    dadosFiltro: any[] = [];
    quantidade = 0;

    resetaDados(){
        return this.data;
    }
    filter(sexo: string) {
        console.log(sexo);
        switch (sexo) {
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
        return this.dadosFiltro.slice(0);
    }
    pesquisaCidade(cidade: string) {
        if (cidade === "") {
            this.dadosFiltro = this.data
                .map((f, i) => ({ id: i + 1, ...f }))
                .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

            this.quantidade = this.dadosFiltro.length;
        } else {
            this.dadosFiltro = this.data
                .filter((f, i) => {
                    if (f.dadosDeputado.dados.ultimoStatus.siglaUf === cidade) {
                        return ({ id: i + 1, ...f })
                    }
                })

            this.quantidade = this.dadosFiltro.length;
        }
        return this.dadosFiltro.slice(0);
    }
    pesquisaPartido(partido: string) {
        if (partido === "") {
            this.dadosFiltro = this.data
                .map((f, i) => ({ id: i + 1, ...f }))
                .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
            this.quantidade = this.dadosFiltro.length;
        } else {
            this.dadosFiltro = this.data
                .filter((f, i) => {
                    if (f.dadosDeputado.dados.ultimoStatus.siglaPartido === partido) {
                        return ({ id: i + 1, ...f })
                    }
                })
            this.quantidade = this.dadosFiltro.length;
        }
        return this.dadosFiltro.slice(0);
    }
}