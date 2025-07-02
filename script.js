let game = [];

const saveGame = () => {
  localStorage.setItem('sudoku', JSON.stringify(game));
}

const loadGame = () => {
  game = JSON.parse(localStorage.getItem('sudoku') || '[]');
  if (game.length === 0) {
    for (let i = 1; i <= 9; i += 1) {
      for (let j = 1; j <= 9; j += 1) {
        game.push({
          row: i,
          col: j,
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          solved: false,
        });
      }
    }
    saveGame();
  }
}

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

  saveGame();
  refreshTable();
}

const resetValue = (row, col) => {
  const cell = game.find(c => c.row === row && c.col === col);
  cell.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  cell.solved = false;

  game.filter(c => !c.solved).forEach((c) => {
    c.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  });

  game.filter(c => c.solved).forEach((c) => {
    setValue(c.row, c.col, c.values[0]);
  });

  saveGame();
  refreshTable();
}

const drawCell = (row, col) => {
  const cell = game.find(c => c.row === row && c.col === col);
  if (cell.solved) {
    const value = cell.values[0];
    document.querySelector(`#cell-${row}-${col}`).innerHTML = `<a href="#" onclick="resetValue(${row},${col}); return false;">${value}</a>`;
    return;
  }

  const html = [`<table>`];
  for (let i = 1; i <= 3; i += 1) {
    html.push(`<tr>`);
    for (let j = 1; j <= 3; j += 1) {
      const value = (i - 1) * 3 + j;
      if (cell.values.includes(value)) {
        const isUniqueValue = cell.values.length === 1;
        const isUniqueInRow = game.filter(c => c.row === row && c.values.includes(value)).length === 1;
        const isUniqueInCol = game.filter(c => c.col === col && c.values.includes(value)).length === 1;
        const isUniqueInBox = game.filter(c => {
          const boxRow = Math.floor((row - 1) / 3) * 3 + 1;
          const boxCol = Math.floor((col - 1) / 3) * 3 + 1;
          return c.row >= boxRow && c.row < boxRow + 3 && c.col >= boxCol && c.col < boxCol + 3 && c.values.includes(value);
        }).length === 1;
        if (isUniqueValue || isUniqueInRow || isUniqueInCol || isUniqueInBox) {
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

const initTable = () => {
  const table = document.createElement('table');
  table.className = 'sudoku';
  for (let i = 1; i <= 9; i += 1) {
    const tr = document.createElement('tr');
    for (let j = 1; j <= 9; j += 1) {
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

const resetGame = () => {
  game = [];
  saveGame();
  loadGame();
  refreshTable();
}

document.addEventListener('DOMContentLoaded', () => {
  loadGame();
  initTable();
});
