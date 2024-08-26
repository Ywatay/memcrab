import { Cell } from '../type/type';
import { generateMatrix } from './generateMatrix';

export const updateCellAmount = (matrix: Cell[][], rowIndex: number, colIndex: number, newAmount: number): Cell[][] => {
  return matrix.map((row, rIdx) =>
    row.map((cell, cIdx) => {
      if (rIdx === rowIndex && cIdx === colIndex) {
        return { ...cell, amount: newAmount };
      }
      return cell;
    })
  );
};

export const addRow = (matrix: Cell[][]): Cell[][] => {
  const numCols = matrix[0]?.length || 0;
  const newRow = generateMatrix(1, numCols)[0];
  return [...matrix, newRow];
};

export const removeRow = (matrix: Cell[][], rowIndex: number): Cell[][] => {
  return matrix.filter((_, index) => index !== rowIndex);
};

export const removeCell = (matrix: Cell[][], rowIndex: number, colIndex: number): Cell[][] => {
  const newMatrix = matrix.map((row, rIdx) =>
    rIdx === rowIndex
      ? row.filter((_, cIdx) => cIdx !== colIndex)
      : row
  ).filter(row => row.length > 0);
  return newMatrix;
};

export const removeColumn = (matrix: Cell[][], colIndex: number): Cell[][] => {
  return matrix.map(row => 
    row.filter((_, cIdx) => cIdx !== colIndex)
  );
};
