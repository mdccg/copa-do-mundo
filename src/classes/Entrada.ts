import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { IEntrada } from '../interfaces/IEntrada';
import { Grupo } from './Grupo';
import { Partida } from './Partida';

export class Entrada implements IEntrada {
  private static _grupos: Grupo[];
  
  public lerArquivo(nomeArquivo: string): string[] {
    const path = join(__dirname, '..', 'data', nomeArquivo);
    return readFileSync(path, 'utf-8').split('\n');
  }

  public salvarArquivo(nomeArquivo: string, conteudoArquivo: string): void {
    const path = join(__dirname, '..', 'data', nomeArquivo);
    writeFileSync(path, conteudoArquivo);
  }

  public lerEquipes(nomeArquivo: string): Grupo[] {
    const conteudoArquivo = this.lerArquivo(nomeArquivo);
    const grupos: Grupo[] = new Array<Grupo>();

    while (conteudoArquivo.length > 0) {
      if (conteudoArquivo.at(0) === '') {
        break;
      }

      const [nome, selecao1, selecao2, selecao3, selecao4] = conteudoArquivo.slice(0, 5);
      const grupo = new Grupo(nome, selecao1, selecao2, selecao3, selecao4);
      
      grupos.push(grupo);

      for (let i = 0; i < 5; ++i) {
        conteudoArquivo.shift();
      }
    }

    Entrada._grupos = grupos;
    return grupos;
  }

  public lerResultados(nomeArquivo: string): Partida[] {
    const conteudoArquivo = this.lerArquivo(nomeArquivo);
    const partidas: Partida[] = new Array<Partida>();

    let grupo: Grupo;

    while (conteudoArquivo.length > 0) {
      const linha = conteudoArquivo.shift();
      
      if (linha === '') {
        continue;
      }

      if (linha.split(' ').at(1) === undefined) {
        const [nomeGrupo] = linha;
        grupo = Entrada._grupos.find(({ nome }) => nome === nomeGrupo);

        if (grupo === undefined) {
          throw new Error(`O grupo ${nomeGrupo} não está cadastrado no arquivo 'equipes.txt'.`);
        }
      } else {
        const { 1: nomeSelecao1, 2: pontuacao, 3: nomeSelecao2 } = linha.split('\'');
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
        partidas.push(partida);
      }
    }

    return partidas;
  }
}