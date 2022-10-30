import { Box } from '@mui/system';
import { GridApi } from 'ag-grid-community';
import { AgGridColumnProps, AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThunkStatus } from '../../interfaces';
import { getEmployeesStatus } from '../employeeSlice';
import { Employee } from '../interfaces';

export function EmployeeTable({ columns, rows }: EmployeeTableProps) {
  const [gridApi, setGridApi] = useState<GridApi>();
  const status = useSelector(getEmployeesStatus);

  useEffect(() => {
    if (!rows.length && status !== 'loading') gridApi?.showNoRowsOverlay();
    if (status === 'loading') gridApi?.showLoadingOverlay();
  }, [gridApi, status]);

  return (
    <Box
      className="ag-theme-material"
      sx={{ height: '80vh', border: '1px solid rgb(226,226,226)' }}
      m={3}>
      <AgGridReact
        rowData={rows}
        columnDefs={columns}
        onGridReady={({ api }) => {
          if (status === 'loading') api.showLoadingOverlay();
          setGridApi(api);
        }}
      />
    </Box>
  );
}

type EmployeeTableProps = {
  columns: AgGridColumnProps[];
  rows: Employee[];
  status: ThunkStatus;
};
