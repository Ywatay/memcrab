import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Cell } from '../../type/type';
import { generateMatrix } from '../../utils/generateMatrix';
import { updateCellAmount, addRow, removeRow, removeCell, removeColumn } from '../../utils/matrixUtils';
import MatrixTable from '../../components/MatrixTable/MatrixTable';

const MatrixContainer: React.FC = () => {
  const [matrix, setMatrix] = useState<Cell[][]>(generateMatrix(5, 5));

  const handleCellUpdate = (rowIndex: number, colIndex: number, newAmount: number) => {
    setMatrix(prevMatrix => updateCellAmount(prevMatrix, rowIndex, colIndex, newAmount));
  };

  const handleAddRow = () => {
    setMatrix(prevMatrix => addRow(prevMatrix));
  };

  const handleRemoveRow = (rowIndex: number) => {
    setMatrix(prevMatrix => removeRow(prevMatrix, rowIndex));
  };

  const handleRemoveCell = (rowIndex: number, colIndex: number) => {
    setMatrix(prevMatrix => removeCell(prevMatrix, rowIndex, colIndex));
  };

  const handleRemoveColumn = (colIndex: number) => {
    setMatrix(prevMatrix => removeColumn(prevMatrix, colIndex));
  };

  return (
    <div style={{ padding: '16px' }}>
      <Button
        onClick={handleAddRow}
        variant="contained"
        color="primary"
        style={{ marginBottom: '16px' }}
      >
        Add Row
      </Button>
      <MatrixTable
        matrix={matrix}
        onCellUpdate={handleCellUpdate}
        onRemoveCell={handleRemoveCell}
        onRemoveRow={handleRemoveRow}
        onRemoveColumn={handleRemoveColumn}
      />
    </div>
  );
};

export default MatrixContainer;
