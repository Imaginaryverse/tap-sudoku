function isGray(row: number, col: number) {
  if (row === 3 || row === 4 || row === 5) {
    if (col === 3 || col === 4 || col === 5) {
      return 'is-gray';
    }
  } else if (
    col === 0 ||
    col === 1 ||
    col === 2 ||
    col === 6 ||
    col === 7 ||
    col === 8
  ) {
    return 'is-gray';
  } else {
    return '';
  }
}

export { isGray };
