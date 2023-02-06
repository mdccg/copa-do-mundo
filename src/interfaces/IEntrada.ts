import { Grupo } from '../classes/Grupo';
import { Partida } from '../classes/Partida';

export interface IEntrada {
  lerEquipes(nomeArquivo: string): Grupo[];
  lerResultados(nomeArquivo: string): Partida[];
}