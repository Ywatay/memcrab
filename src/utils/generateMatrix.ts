import { Cell } from "../type/type";

export const generateMatrix = (numRows: number, numCols: number): Cell[][] => {
    return Array.from({ length: numRows }, (_, rowIndex) => 
      Array.from({ length: numCols }, (_, colIndex) => ({
        id: rowIndex * numCols + colIndex, 
        amount: Math.floor(Math.random() * 100)
      }))
    );
  };
  