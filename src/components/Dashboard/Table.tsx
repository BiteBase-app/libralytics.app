/* eslint-disable no-console */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Papa from 'papaparse';
import * as React from 'react';

interface ITable {
  csvFilePath: string; // Prop for CSV file path
}

const CustomTable: React.FC<ITable> = ({ csvFilePath }) => {
  const [columnArray, setColumn] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<unknown[][]>([]);

  React.useEffect(() => {
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvText) => {
        const results = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim(),
        });
        console.log(`Results for ${csvFilePath}:`, results);
        const columnsSet = new Set<string>();
        const valuesArray: unknown[][] = [];

        results.data.forEach((d: any) => {
          const keys = Object.keys(d);
          keys.forEach((key) => columnsSet.add(key));
          valuesArray.push(Object.values(d));
        });

        const columnsArray = Array.from(columnsSet);
        setColumn(columnsArray);
        setValues(valuesArray);
      })
      .catch((error) => {
        console.error(`Error fetching or parsing CSV file: ${error}`);
      });
  }, [csvFilePath]);

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 440,
          maxWidth: { sm: 660, md: 800, lg: 1000 },
          overflowX: 'auto',
          margin: 'auto',
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ whiteSpace: 'nowrap', wordWrap: 'break-word' }}>
            <TableRow>
              {columnArray.map((column, i) => (
                <TableCell key={i}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {values.map((v, i) => {
              return (
                <TableRow hover tabIndex={-1} key={i}>
                  {v.map((x: any, j: number) => {
                    const value = x as React.ReactNode | string;
                    return (
                      <TableCell
                        key={j}
                        sx={{ whiteSpace: 'nowrap', wordWrap: 'break-word' }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTable;
