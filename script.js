const game = [];

const setValue = (row, col, value) => {
  game.filter(c => c.row === row || c.col === col)
    .forEach(c => {
      c.values = c.values.filter(v => v !== value);
    });

  const boxRow = Math.floor((row - 1) / 3) * 3 + 1;
  const boxCol = Math.floor((col - 1) / 3) * 3 + 1;
  for (let i = boxRow; i < boxRow + 3; i += 1) {
    for (let j = boxCol; j < boxCol + 3; j += 1) {
      const cell = game.find(c => c.row === i && c.col === j);
      cell.values = cell.values.filter(v => v !== value);
    }
  }

  const cell = game.find(c => c.row === row && c.col === col);
  cell.values = [value];
  cell.solved = true;

  refreshTable();
  console.log(game);
}

const drawCell = (row, col) => {
  const cell = game.find(c => c.row === row && c.col === col);
  if (cell.solved) {
    document.querySelector(`#cell-${row}-${col}`).innerHTML = cell.values[0].toString();
    return;
  }

  const html = [`<table>`];
  for (let i = 1; i <= 3; i += 1) {
    html.push(`<tr>`);
    for (let j = 1; j <= 3; j += 1) {
      const value = (i - 1) * 3 + j;
      if (cell.values.includes(value)) {
        if (cell.values.length === 1) {
          html.push(`<td class="sub-cell solved"><a href="#" onclick="setValue(${row},${col},${value}); return false;">${value}</a></td>`);
        } else {
          html.push(`<td class="sub-cell enabled"><a href="#" onclick="setValue(${row},${col},${value}); return false;">${value}</a></td>`);
        }
      } else {
        html.push(`<td class="sub-cell disabled">${value}</td>`);
      }
    }
    html.push("</tr>");
  }
  html.push("</table>");

  document.querySelector(`#cell-${row}-${col}`).innerHTML = html.join("");
}

const refreshTable = () => {
  game.forEach(cell => {
    drawCell(cell.row, cell.col);
  });
}

const init = () => {
  const table = document.createElement('table');
  table.className = 'sudoku';
  for (let i = 1; i <= 9; i += 1) {
    const tr = document.createElement('tr');
    for (let j = 1; j <= 9; j += 1) {
      game.push({
        row: i,
        col: j,
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        solved: false,
      });

      const td = document.createElement('td');
      td.className = 'cell';
      td.id = `cell-${i}-${j}`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.querySelector("#sudoku").appendChild(table);

  refreshTable();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
  console.log(new Date());
});
