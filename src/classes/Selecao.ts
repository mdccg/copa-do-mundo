export class Selecao {
  private _nome: string;
  private _pontos: number;
  private _vitorias: number;
  private _empates: number;
  private _derrotas: number;
  private _golsPro: number;
  private _golsContra: number;
  private _saldoGols: number;

  constructor(nome: string) {
    this.nome = nome;
    this.pontos = 0;
    this.vitorias = 0;
    this.empates = 0;
    this.derrotas = 0;
    this.golsPro = 0;
    this.golsContra = 0;
    this.saldoGols = 0;
  }

  public imprimir(): void {
    console.table(this);
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    if (!value) {
      throw new Error('Uma seleção precisa ter um nome.');
    }

    this._nome = value;
  }

  public get pontos(): number {
    return this._pontos;
  }

  public set pontos(value: number) {
    this._pontos = value;
  }

  public get vitorias(): number {
    return this._vitorias;
  }
  
  public set vitorias(value: number) {
    this._vitorias = value;
  }

  public get empates(): number {
    return this._empates;
  }

  public set empates(value: number) {
    this._empates = value;
  }

  public get derrotas(): number {
    return this._derrotas;
  }

  public set derrotas(value: number) {
    this._derrotas = value;
  }

  public get golsPro(): number {
    return this._golsPro;
  }

  public set golsPro(value: number) {
    this._golsPro = value;
  }

  public get golsContra(): number {
    return this._golsContra;
  }

  public set golsContra(value: number) {
    this._golsContra = value;
  }

  public get saldoGols(): number {
    return this._saldoGols;
  }

  public set saldoGols(value: number) {
    this._saldoGols = value;
  }
}