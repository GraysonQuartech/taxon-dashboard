/** @format */
//IMPORT React and Child Components
import React from "react";
import RowRegular from "./RowRegular";
//IMPORT MUI packages
import { Paper, TablePagination, Theme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClassDense: {
    //height: "65vh",
    maxHeight: "58vh",
    width: "100%",
  },
  tableClass: {
    //height: "58vh",
    maxHeight: "58vh",
    width: "100%",
  },
  tableHeaderClass: {
    backgroundColor: globalTheme.palette.secondary.light,
    "& th": {
      fontWeight: globalTheme.typography.fontWeightMedium,
    },
  },
  titleClass: {
    padding: globalTheme.spacing(1),
    color: globalTheme.palette.secondary.dark,
  },
}));

/*
 *Generic props. table rows and columns
 */
export interface TableProps<T> {
  tableName: string;
  rows: T[];
  columns: IColumn<T>[];
  getRowID: (row: T) => string;
  dense: boolean;
}

/*
 * Displays the quantitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const RegularTable = <T extends Record<string, string | number | null>>(props: TableProps<T>) => {
  //HOOKS
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  //RETURN ELEMENT
  return (
    <div>
      <Typography variant="h6" className={classes.titleClass}>
        {props.tableName}
      </Typography>
      <Paper>
        <TableContainer className={props.dense ? classes.tableClassDense : classes.tableClass}>
          <Table size="small" stickyHeader>
            <TableHead className={classes.tableHeaderClass}>
              <TableRow>
                {props.columns.map((column) => (
                  <TableCell key={column.field as string}>{column.headerName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.slice(startIndex, endIndex).map((row) => (
                <RowRegular
                  key={props.getRowID(row)}
                  row={row}
                  columns={props.columns}
                  rowID={props.getRowID(row)}
                  dense={props.dense}
                />
              ))}
            </TableBody>
          </Table>{" "}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default RegularTable;
