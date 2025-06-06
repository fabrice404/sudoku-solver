const sudoku = [
  [9, 0, 5, 4, 0, 7, 0, 1, 0],
  [0, 1, 0, 6, 0, 8, 7, 0, 9],
  [0, 0, 2, 0, 9, 0, 0, 0, 0],
  [1, 0, 0, 5, 0, 3, 0, 0, 0],
  [2, 9, 7, 0, 8, 0, 5, 0, 3],
  [0, 0, 0, 9, 0, 2, 0, 0, 6],
  [0, 0, 0, 0, 3, 0, 6, 0, 0],
  [5, 0, 1, 2, 0, 4, 8, 9, 0],
  [0, 8, 0, 0, 0, 5, 2, 0, 4],
];

const print = () => {
  console.log('┌───────┬───────┬───────┐');
  for (let i = 0; i < 9; i++) {
    if (i === 3 || i === 6) {
      console.log('├───────┼───────┼───────┤')
    }
    let line = '| '
    for (let j = 0; j < 9; j++) {
      if (j === 3 || j === 6) {
        line += '| ';
      }
      line += `${Number.isInteger(sudoku[i][j]) ? sudoku[i][j] || ' ' : ' '} `;
    }
    line += '|';
    console.log(line);
  }
  console.log('└───────┴───────┴───────┘');
};

const isPossible = (i, j, n) => {
  //  Check row
  for (let x = 0; x < 9; x++) {
    if (sudoku[i][x] === n) {
      return false;
    }
  }
  // Check column
  for (let x = 0; x < 9; x++) {
    if (sudoku[x][j] === n) {
      return false;
    }
  }
  // Check box
  const boxRow = Math.floor(i / 3) * 3;
  const boxCol = Math.floor(j / 3) * 3;
  for (let x = boxRow; x < boxRow + 3; x++) {
    for (let y = boxCol; y < boxCol + 3; y++) {
      if (sudoku[x][y] === n) {
        return false;
      }
    }
  }
  return true;
};

const solve = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        sudoku[i][j] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
      if (Array.isArray(sudoku[i][j])) {
        sudoku[i][j] = sudoku[i][j].filter(n => isPossible(i, j, n));
        if (sudoku[i][j].length === 1) {
          sudoku[i][j] = sudoku[i][j][0];
        }
      }
    }
  }
};

print();
while (sudoku.some(row => row.some(cell => cell === 0 || Array.isArray(cell)))) {
  solve();
  print();
}















