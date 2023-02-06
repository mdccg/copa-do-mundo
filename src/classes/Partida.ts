import { Grupo } from './Grupo';
import { Selecao } from './Selecao';

export class Partida {
  private _grupo: Grupo;
  private _selecao1: Selecao;
  private _selecao2: Selecao;
  private _golsSelecao1: number;
  private _golsSelecao2: number;

  constructor(grupo: Grupo, selecao1: Selecao, selecao2: Selecao, golsSelecao1: number, golsSelecao2: number) {
    this.grupo = grupo;
    this.selecao1 = selecao1;
    this.selecao2 = selecao2;
    this.golsSelecao1 = golsSelecao1;
    this.golsSelecao2 = golsSelecao2;
  }

  public get grupo(): Grupo {
    return this._grupo;
  }

  public set grupo(value: Grupo) {
    this._grupo = value;
  }

  public get selecao1(): Selecao {
    return this._selecao1;
  }

  public set selecao1(value: Selecao) {
    this._selecao1 = value;
  }

  public get selecao2(): Selecao {
    return this._selecao2;
  }

  public set selecao2(value: Selecao) {
    this._selecao2 = value;
  }

  public get golsSelecao1(): number {
    return this._golsSelecao1;
  }

  public set golsSelecao1(value: number) {
    this._golsSelecao1 = value;
  }

  public get golsSelecao2(): number {
    return this._golsSelecao2;
  }

  public set golsSelecao2(value: number) {
    this._golsSelecao2 = value;
  }

  public toString(): string {
    return `'${this.selecao1.nome}' ${this.golsSelecao1} x ${this.golsSelecao2} '${this.selecao2.nome}'`;
  }
}