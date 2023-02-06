# copa-do-mundo

## Sumário

- [copa-do-mundo](#copa-do-mundo)
  - [Sumário](#sumário)
  - [Motivação](#motivação)
  - [Base de dados](#base-de-dados)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Como rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)

## Motivação

```console
$ yarn start

      ___________________________________________________
      < Seja bem-vindo ao programa da Copa do Mundo 2022! >
      ---------------------------------------------------
              \   ^__^
               \  (oo)\_______
                  (__)\       )\/\
                      ||----w |
                      ||     ||

      Ler um (g)rupo
      Ler uma (p)artida
      (I)mprimir a tabela
      (E)ncerrar o programa

      Uma dica: utilize as letras destacadas acima para selecionar uma opção.
```

Este app consiste em um sistema para contabilizar pontos das seleções da Copa do Mundo 2022. Cada país tem uma e somente uma seleção e cada grupo tem exatamente quatro seleções. As seleções de um mesmo grupo competem entre si para que seja eleito um vencedor e ele componha o próximo grupo até a partida final. Vale destacar que o código não sorteia nenhum valor; todo o jogo deve se suceder através das ações do usuário.

Os grupos com suas seleções e partidas já disputadas são salvos nos arquivos [`equipes.txt`](./src/data/equipes.txt) e [`resultados.txt`](./src/data/resultados.txt), respectivamente. O arquivo `equipes.txt` dispõe o nome do grupo e os nomes das respectivas seleções separados por quebra de linha; ou seja, um grupo a cada cinco linhas. Já o arquivo `resultados.txt` dispõe o nome do grupo e todas as partidas do grupo em questão separadas por quebra de linha no seguinte formato:

```
'Brasil' 7 x 1 'Croácia'
```

As aspas delimitam o nome da seleção, para registrar países cujos nomes têm mais de uma palavra, e o nome da seleção está imediatamente ao lado do número de gols marcados por ela. No exemplo acima, a seleção brasileira marcou sete gols ao passo que a seleção croata marcou apenas um.

O sistema de pontuação está presente no método privado `atualizarTabela` da classe [`Grupo`](./src/classes/Grupo.ts). Em suma, a partida vencedora ganha três pontos e, em caso de empate, as duas partidas ganham apenas um ponto. O saldo de gols tradicionalmente consiste na diferença entre o número de gols marcados e o número de gols sofridos e tanto o número de vitórias como o número de derrotas de cada seleção é contabilizado.

## Base de dados

| Seleção |
|-|
| Nome |
| Pontos |
| Vitórias |
| Empates |
| Derrotas |
| Gols marcados |
| Gols sofridos |
| Saldo de gols |

| Grupo |
|-|
| Nome |
| Seleções |

| Partida |
|-|
| Grupo |
| Seleção vencedora |
| Seleção derrotada |
| Gols da seleção vencedora |
| Gols da seleção derrotada |

## Pilha de tecnologia

As seguintes tecnologias foram utilizadas para desenvolver este app:

| Papel | Tecnologia |
|-|-|
| Ambiente de execução | [Node](https://nodejs.org/en/) |
| Linguagem de programação | [TypeScript](https://www.typescriptlang.org/) |

## Como rodar

### Pré-requisitos

- [Node](https://nodejs.org/en/download/);
- [Yarn](https://yarnpkg.com/) (opcional).

### Passo a passo

1. Clone o repositório de código em sua máquina;
   
2. Abra um shell de comando de sua preferência (prompt de comando, PowerShell, terminal _etc_.);

3. Instale as dependências do projeto através do seguinte comando:

```console
$ npm install
```

Caso esteja utilizando o gerenciador de pacotes Yarn, execute o seguinte comando como alternativa:

```console
$ yarn
```

4. Finalmente, execute o seguinte comando para iniciar o app:

Para npm:

```console
$ npm run start
```

Para Yarn:

```console
$ yarn start
```