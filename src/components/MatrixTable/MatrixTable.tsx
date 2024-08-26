import React, { useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Cell } from '../../type/type';
import { calculateColumnMedians, calculateRowSum } from './utils';

interface MatrixTableProps {
  matrix: Cell[][];
  onCellUpdate: (rowIndex: number, colIndex: number, newAmount: number) => void;
  onRemoveCell: (rowIndex: number, colIndex: number) => void;
  onRemoveRow: (rowIndex: number) => void;
  onRemoveColumn: (colIndex: number) => void;
}

const MatrixTable: React.FC<MatrixTableProps> = ({ matrix, onCellUpdate, onRemoveCell, onRemoveRow, onRemoveColumn }) => {
  const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
  const [nearestCells, setNearestCells] = useState<Set<number>>(new Set());
  const [hoveredSumRowIndex, setHoveredSumRowIndex] = useState<number | null>(null);

  const numCols = matrix[0]?.length || 0;

  const findNearestCells = useCallback((cell: Cell, X: number): void => {
    const allCells = matrix.flat();
    const sortedCells = allCells
      .map(c => ({ ...c, distance: Math.abs(c.amount - cell.amount) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, X);
    
    setNearestCells(new Set(sortedCells.map(c => c.id)));
  }, [matrix]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const newAmount = matrix[rowIndex][colIndex].amount + 1;
    onCellUpdate(rowIndex, colIndex, newAmount);
  };
  
  const handleCellMouseEnter = (cell: Cell) => {
    setHoveredCell(cell);
    findNearestCells(cell, 5);
  };

  const handleCellMouseLeave = () => {
    setHoveredCell(null);
    setNearestCells(new Set());
  };

  const handleSumCellMouseEnter = (rowIndex: number) => {
    setHoveredSumRowIndex(rowIndex);
  };

  const handleSumCellMouseLeave = () => {
    setHoveredSumRowIndex(null);
  };

  const handleRemoveCell = (rowIndex: number, colIndex: number) => {
    onCellUpdate(rowIndex, colIndex, 0);
  };

  const handleRemoveRow = (rowIndex: number) => {
    onRemoveRow(rowIndex);
  };

  const handleRemoveColumn = (colIndex: number) => {
    onRemoveColumn(colIndex);
  };

  const columnMedians = calculateColumnMedians(matrix);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from({ length: numCols }, (_, colIndex) => (
              <TableCell key={colIndex}>
                Cell Value N = {colIndex + 1}
                <IconButton
                  onClick={() => handleRemoveColumn(colIndex)}
                  color="secondary"
                  style={{ marginLeft: 8 }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            ))}
            <TableCell>Row Sum</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {matrix.map((row, rowIndex) => {
            const rowSum = calculateRowSum(row);
            return (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const percentage = rowSum ? (cell.amount / rowSum) * 100 : 0;
                  const isHoveredCell = hoveredCell?.id === cell.id;
                  const isHoveredRow = hoveredSumRowIndex === rowIndex;
                  return (
                    <TableCell
                      key={cell.id}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onMouseEnter={() => handleCellMouseEnter(cell)}
                      onMouseLeave={handleCellMouseLeave}
                      style={{
                        backgroundColor: nearestCells.has(cell.id) ? 'yellow' : 'transparent',
                        backgroundImage: isHoveredRow ? `linear-gradient(to right, #00f ${percentage}%, #fff ${percentage}%)` : undefined,
                        position: 'relative',
                        padding: 0, 
                        color: cell.amount === 0 ? 'transparent' : 'inherit'
                      }}
                    >
                      {isHoveredRow ? `${percentage.toFixed(2)}%` : (cell.amount === 0 ? '-' : cell.amount)}
                      {isHoveredCell && (
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCell(rowIndex, colIndex);
                          }}
                          color="secondary"
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell
                  onMouseEnter={() => handleSumCellMouseEnter(rowIndex)}
                  onMouseLeave={handleSumCellMouseLeave}
                >
                  {rowSum}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveRow(rowIndex)}
                    color="secondary"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            {Array.from({ length: numCols }, (_, colIndex) => (
              <TableCell key={colIndex}>Average</TableCell>
            ))}
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            {columnMedians.map((median, colIndex) => (
              <TableCell key={colIndex}>{median}</TableCell>
            ))}
            <TableCell>Median</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default MatrixTable;
