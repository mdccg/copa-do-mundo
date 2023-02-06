import { print } from '../functions/print';
import { Selecao } from './Selecao';

const ordenarSelecoes = (selecoes: Selecao[]): void => {
  selecoes.sort((selecao1, selecao2) => {
    if (selecao1.pontos > selecao2.pontos) {
      return -1;
    }

    if (selecao1.pontos < selecao2.pontos) {
      return 1;
    }

    if (selecao1.pontos === selecao2.pontos) {
      if (selecao1.saldoGols > selecao2.saldoGols) {
        return -1;
      }

      if (selecao1.saldoGols < selecao2.saldoGols) {
        return 1;
      }

      if (selecao1.saldoGols === selecao2.saldoGols) {
        if (selecao1.golsPro > selecao2.golsPro) {
          return -1;
        }

        if (selecao1.golsPro < selecao2.golsPro) {
          return 1;
        }
      }
    }

    return 0;
  });
}

export class Grupo {
  private _nome: string;
  private _selecoes: Selecao[];

  constructor(
    nome: string,
    nomeSelecao1: string,
    nomeSelecao2: string,
    nomeSelecao3: string,
    nomeSelecao4: string
  ) {
    const nomesSelecoes: string[] = [nomeSelecao1, nomeSelecao2, nomeSelecao3, nomeSelecao4];

    if (nomesSelecoes.filter(Boolean).length !== 4) {
      throw new Error('Uma ou mais seleções não foram informadas.');
    }

    this.nome = nome;
    this.selecoes = nomesSelecoes.map((nomeSelecao) => new Selecao(nomeSelecao));
  }

  public imprimir(): void {
    print(`Grupo ${this.nome}`);
    console.table(this.selecoes);
    console.log('\n'.repeat(3));
  }

  public get nome(): string {
    return this._nome;
  }
  
  public set nome(value: string) {
    this._nome = value;
  }

  public get selecoes(): Selecao[] {
    ordenarSelecoes(this._selecoes);
    return this._selecoes;
  }

  public set selecoes(value: Selecao[]) {
    this._selecoes = value;
  }

  /**
   * 
   * @param resultadoPartida "'Brasil' 4 x 1 'Coréia do Sul'"
   */
  public partida(resultadoPartida: string): void {
    const {
      1: nomeSelecao1,
      2: pontuacao,
      3: nomeSelecao2
    } = resultadoPartida.split('\'');
    
    const [golsSelecao1, , golsSelecao2] = pontuacao.trim().split(' ');
    
    this.atualizarTabela(
      nomeSelecao1,
      Number(golsSelecao1),
      nomeSelecao2,
      Number(golsSelecao2)
    );
  }

  private atualizarTabela(
    nomeSelecao1: string,
    golsSelecao1: number,
    nomeSelecao2: string,
    golsSelecao2: number
  ): void {
    const nomesSelecoes: string[] = this.selecoes.map(({ nome }) => nome);

    if (!nomesSelecoes.includes(nomeSelecao1)) {
      throw new Error(`A seleção ${nomeSelecao1} não está cadastrada no grupo ${this.nome}.`);
    }

    if (!nomesSelecoes.includes(nomeSelecao2)) {
      throw new Error(`A seleção ${nomeSelecao2} não está cadastrada no grupo ${this.nome}.`);
    }
    
    if (golsSelecao1 < 0) {
      throw new Error(`A seleção ${nomeSelecao1} não pode ter feito gols negativos.`);
    }

    if (golsSelecao2 < 0) {
      throw new Error(`A seleção ${nomeSelecao2} não pode ter feito gols negativos.`);
    }

    const selecao1 = this.selecoes.find(({ nome }) => nome === nomeSelecao1);
    const selecao2 = this.selecoes.find(({ nome }) => nome === nomeSelecao2);

    let vencedor: Selecao;
    let perdedor: Selecao;
    let golsVencedor: number;
    let golsPerdedor: number;
    let empatou: boolean = golsSelecao1 === golsSelecao2;

    vencedor = golsSelecao1 > golsSelecao2 ? selecao1 : selecao2;  
    perdedor = golsSelecao1 > golsSelecao2 ? selecao2 : selecao1;  
    golsVencedor = golsSelecao1 > golsSelecao2 ? golsSelecao1 : golsSelecao2;  
    golsPerdedor = golsSelecao1 > golsSelecao2 ? golsSelecao2 : golsSelecao1;  

    vencedor.golsPro += golsVencedor;
    vencedor.golsContra += golsPerdedor;
    vencedor.saldoGols += (golsVencedor - golsPerdedor);
    perdedor.golsPro += golsPerdedor;
    perdedor.golsContra += golsVencedor;
    perdedor.saldoGols += (golsPerdedor - golsVencedor);

    if (empatou) {
      vencedor.pontos++;
      perdedor.pontos++;
      vencedor.empates++;
      perdedor.empates++;

    } else {
      vencedor.pontos += 3;
      vencedor.vitorias++;
      perdedor.derrotas++;
    }
  }
}