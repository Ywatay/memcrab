import { Cell } from "../../../type/type";
import { calculateMedian } from "../../../utils/calculateMedian";

export const calculateRowSum = (row: Cell[]): number => {
  return row.reduce((sum, cell) => sum + cell.amount, 0);
};

export const calculateRowAverages = (row: Cell[]): number => {
  return row.length ? calculateRowSum(row) / row.length : 0;
};

export const extractColumnValues = (matrix: Cell[][], columnIndex: number): number[] => {
  return matrix.map(row => row[columnIndex]?.amount || 0);
};

export const calculateColumnMedians = (matrix: Cell[][]): number[] => {
  const numCols = matrix[0]?.length || 0;
  const medians: number[] = [];
  for (let col = 0; col < numCols; col++) {
    const columnValues = extractColumnValues(matrix, col);
    medians.push(calculateMedian(columnValues));
  }
  return medians;
};
