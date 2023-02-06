export const print = (corpo: string): void => {
  let carta: string = '';
  carta += '*'.repeat(corpo.length + 4) + '\n';
  carta += '*' + ' '.repeat(corpo.length + 2) + '*\n';
  carta += '* ' + corpo + ' *\n';
  carta += '*' + ' '.repeat(corpo.length + 2) + '*\n';
  carta += '*'.repeat(corpo.length + 4);
  console.log(carta);
}