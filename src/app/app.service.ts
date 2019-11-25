import data1 from '../data/data1.json';
import data2 from '../data/data2.json';
import data3 from '../data/data3.json';
import data4 from '../data/data4.json';
import data5 from '../data/data5.json';
import data6 from '../data/data6.json';
import data7 from '../data/data7.json';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    data: any[] = [];
    sexo = 'T';
    dadosFiltro: any[] = [];
    quantidade = 0;
    constructor() {
        data1.map(d => this.data.push(d));
        data2.map(d => this.data.push(d));
        data3.map(d => this.data.push(d));
        data4.map(d => this.data.push(d));
        data5.map(d => this.data.push(d));
        data6.map(d => this.data.push(d));
        data7.map(d => this.data.push(d));
    }

    resetaDados() {
        return this.data;
    }
    filter(data: any[], sexo: string) {
        switch (sexo) {
            case 'F':
                this.dadosFiltro = data
                    .filter((f, i) => {
                        if (f.dadosDeputado.dados.sexo === 'F') {
                            return ({ id: i + 1, ...f });
                        }
                    });
                this.quantidade = this.dadosFiltro.length;
                break;
            case 'M':
                this.dadosFiltro = data
                    .filter((f, i) => {
                        if (f.dadosDeputado.dados.sexo === 'M') {
                            return ({ id: i + 1, ...f });
                        }
                    });
                this.quantidade = this.dadosFiltro.length;
                break;
            default:
                this.dadosFiltro = data
                    .map((f, i) => ({ id: i + 1, ...f }));
                this.quantidade = this.dadosFiltro.length;
                break;
        }
        return this.dadosFiltro;
    }
    pesquisaEstado(data: any[], estado: string) {
        if (estado === '') {
            this.dadosFiltro = data
                .map((f, i) => ({ id: i + 1, ...f }));
            this.quantidade = this.dadosFiltro.length;
        } else {
            this.dadosFiltro = data
                .filter((f, i) => {
                    if (f.dadosDeputado.dados.ultimoStatus.siglaUf === estado) {
                        return ({ id: i + 1, ...f });
                    }
                });

            this.quantidade = this.dadosFiltro.length;
        }
        return this.dadosFiltro;
    }
    pesquisaPartido(data: any[], partido: string) {
        if (partido === '') {
            this.dadosFiltro = data
                .map((f, i) => ({ id: i + 1, ...f }));
            this.quantidade = this.dadosFiltro.length;
        } else {
            this.dadosFiltro = data
                .filter((f, i) => {
                    if (f.dadosDeputado.dados.ultimoStatus.siglaPartido === partido) {
                        return ({ id: i + 1, ...f });
                    }
                });
            this.quantidade = this.dadosFiltro.length;
        }
        return this.dadosFiltro;
    }

    filtrar(filter: { sexo: string, estado: string, partido: string }) {
        let filteredData = this.data;
        if (filter.sexo) {
            filteredData = this.filter(filteredData, filter.sexo);
        }
        if (filter.estado) {
            filteredData = this.pesquisaEstado(filteredData, filter.estado);
        }
        if (filter.partido) {
            filteredData = this.pesquisaPartido(filteredData, filter.partido);
        }

        return filteredData;
    }
}
