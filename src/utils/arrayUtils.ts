/**
 * Returns an array of shuffled elements.
 *
 * @description Takes an array of elements and returns an array of the same elements in a shuffled order.
 *
 * @param array An array of elements of any type.
 *
 */
function shuffleArray(array: Array<any>): Array<any> {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * Returns all elements in a row.
 *
 * @description Takes an array of elements and a row index. Returns an array of all elements in the row.
 *
 * @param array An array of elements of any type.
 * @param row A number representing the current row index of the array.
 */
function getNumsInRow(array: Array<any>, row: number): Array<any> {
  return [...array][row];
}

/**
 * Returns all elements in a column.
 *
 * @description Takes an array of elements and a column index. Returns an array of all elements in the column.
 *
 * @param array An array of elements of any type.
 * @param col A number representing the current column index of the array.
 */
function getNumsInCol(array: Array<any>, col: number): Array<any> {
  return array.map(row => row[col]);
}

/**
 * Returns all elements in a 3x3 sub-grid.
 *
 * @description Takes an array of elements, a row index and a column index. Returns an array of all elements found in a 3x3 sub-grid.
 *
 * @param array An array of elements of any type.
 * @param row A number representing the current row index of the array.
 * @param col A number representing the current column index of the array.
 */
function getNumsInBox(array: Array<any>, row: number, col: number): Array<any> {
  const sqrt = Math.floor(Math.sqrt(array.length));
  const boxRowStart = row - (row % sqrt);
  const boxColStart = col - (col % sqrt);

  const numsInBox = [];
  for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
    for (let c = boxColStart; c < boxColStart + sqrt; c++) {
      numsInBox.push(array[r][c]);
    }
  }

  return numsInBox;
}

export { shuffleArray, getNumsInRow, getNumsInCol, getNumsInBox };
