import { Grupo } from './Grupo';
import { print } from '../functions/print';
import { Entrada } from './Entrada';
import { Partida } from './Partida';
import { Selecao } from './Selecao';
import { prompt } from '../functions/prompt';

const organizaPartidasPorGrupo = (partidas: Partida[]): Map<string, Partida[]> => {
  const hashMap = new Map<string, Partida[]>();

  for (const partida of partidas) {
    let partidasAgrupadas = hashMap.get(partida.grupo.nome) || [];
    partidasAgrupadas.push(partida);
    hashMap.set(partida.grupo.nome, partidasAgrupadas);
  }

  return hashMap;
}

export class Tabela {
  private _grupos: Grupo[];
  private _partidas: Partida[];

  constructor() {
    this.carregarEquipes();
    this.carregarPartidas();

    let entrada: string;
    let atalhoValido: boolean = true;

    while (entrada !== 'E') {
      if (atalhoValido) {
        this.menu();
      } else {
        console.warn(`A opção ${entrada} é inválida.`);
        atalhoValido = true;
      }

      entrada = prompt('Opção: ').toUpperCase();

      switch (entrada) {
        case 'G':
          this.lerGrupo();
          break;

        case 'P':
          this.lerPartida();
          break;

        case 'I':
          if (this._grupos.length === 0) {
            print('Não há nenhum grupo cadastrado na tabela.');
          } else {
            this.imprimirGrupos();
          }
          break;

        case 'E':
          this.salvarGrupos();
          this.salvarPartidas();
          break;

        default:
          atalhoValido = false;
      }
    }
  }

  public lerGrupo(): void {
    const nomeGrupo = prompt('Informe o nome do grupo: ');

    if (this._grupos.map(({ nome }) => nome).includes(nomeGrupo)) {
      throw new Error(`Um grupo com o nome ${nomeGrupo} já foi criado.`);
    }

    const nomeSelecao1 = prompt('Informe o nome da primeira seleção: ');
    this.verificaSelecaoExistente(nomeSelecao1);

    const nomeSelecao2 = prompt('Informe o nome da segunda seleção: ');
    this.verificaSelecaoExistente(nomeSelecao2);

    const nomeSelecao3 = prompt('Informe o nome da terceira seleção: ');
    this.verificaSelecaoExistente(nomeSelecao3);

    const nomeSelecao4 = prompt('Informe o nome da quarta seleção: ');
    this.verificaSelecaoExistente(nomeSelecao4);

    const grupo = new Grupo(nomeGrupo, nomeSelecao1, nomeSelecao2, nomeSelecao3, nomeSelecao4);
    this._grupos.push(grupo);
    this.imprimirGrupos();
    console.log(`O grupo ${nomeGrupo} foi cadastrado com êxito.`);
  }

  public lerPartida(): void {
    this.imprimirGrupos();
    const nomeGrupo = prompt('Informe o nome do grupo: ');
    const grupo = this._grupos.find(({ nome }) => nome === nomeGrupo);

    if (grupo === undefined) {
      throw new Error(`O grupo ${nomeGrupo} não está cadastrado.`);
    }

    console.log('Agora, informe o placar final da partida no seguinte formato:\n');
    console.log(`'Brasil' 7 x 1 'Coréia do Norte'\n`);
    console.log('As aspas servem para computar os nomes de seleções com espaço.');
    
    const resultadoPartida = prompt('Partida: ');
    
    const { 1: nomeSelecao1, 2: pontuacao, 3: nomeSelecao2 } = resultadoPartida.split('\'');
    const selecao1 = grupo.selecoes.find(({ nome }) => nome === nomeSelecao1);
    const selecao2 = grupo.selecoes.find(({ nome }) => nome === nomeSelecao2);

    if (selecao1 === undefined) {
      throw new Error(`A seleção ${nomeSelecao1} não pertence ao grupo ${grupo.nome}.`);
    }

    if (selecao2 === undefined) {
      throw new Error(`A seleção ${nomeSelecao2} não pertence ao grupo ${grupo.nome}.`);
    }

    const [golsSelecao1, , golsSelecao2] = pontuacao.trim().split(' ');
    const partida = new Partida(grupo, selecao1, selecao2, Number(golsSelecao1), Number(golsSelecao2));
    grupo.partida(partida.toString());
    this._partidas.push(partida);
    this.imprimirGrupos();

    console.log('A partida foi registrada com êxito.');
  }

  public menu(): void {
    console.log(`
      ___________________________________________________
      < Seja bem-vindo ao programa da Copa do Mundo 2022! >
      ---------------------------------------------------
              \\   ^__^
               \\  (oo)\\_______
                  (__)\\       )\\/\\
                      ||----w |
                      ||     ||

      Ler um (g)rupo
      Ler uma (p)artida
      (I)mprimir a tabela
      (E)ncerrar o programa

      Uma dica: utilize as letras destacadas acima para selecionar uma opção.
    `);
  }

  private imprimirGrupos(): void {
    this._grupos.forEach((grupo) => grupo.imprimir());
  }

  private carregarEquipes(): void {
    const entrada = new Entrada();
    this._grupos = entrada.lerEquipes('equipes.txt');
  }

  private carregarPartidas(): void {
    const entrada = new Entrada();
    this._partidas = entrada.lerResultados('resultados.txt');
  }

  private buscaTodasSelecoes(): Selecao[] {
    return this._grupos.map(({ selecoes }) => selecoes).flat();
  }

  private verificaSelecaoExistente(nomeSelecao: string): void {
    const selecoes: Selecao[] = this.buscaTodasSelecoes();
    const existeSelecao: boolean = selecoes.map(({ nome }) => nome).includes(nomeSelecao);
    
    if (existeSelecao) {
      throw new Error(`Uma seleção com o nome ${nomeSelecao} já foi criada.`);
    }
  }

  private salvarGrupos(): void {
    let conteudoArquivo: string = this._grupos.map((grupo) =>
      grupo.nome + '\n' + grupo.selecoes.map((selecao) =>
        selecao.nome
      ).join('\n')
    ).join('\n');

    const entrada = new Entrada();
    entrada.salvarArquivo('equipes.txt', conteudoArquivo);
  }

  private salvarPartidas(): void {
    this._partidas.sort((a, b) => {
      if (a.grupo.nome > b.grupo.nome) {
        return -1;
      } else if (a.grupo.nome < b.grupo.nome) {
        return 1;
      } else {
        return 0;
      }
    });

    const hashMap = organizaPartidasPorGrupo(this._partidas);
    let conteudoArquivo: string = '';

    for (let [nomeGrupo, partidas] of hashMap) {
      conteudoArquivo += nomeGrupo + '\n';
      partidas.forEach((partida) => conteudoArquivo += partida.toString() + '\n');
    }

    const entrada = new Entrada();
    entrada.salvarArquivo('resultados.txt', conteudoArquivo);
  }
}