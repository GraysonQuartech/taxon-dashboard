/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
import RowCollapse from "./RowCollapse";
import { useTaxon } from "../contexts/taxonContext";
//IMPORT MUI packages
import { Grid, Paper, TablePagination, Theme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";
import TaxonBubble from "./TaxonBubble";
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClass: {
    //height: "58vh",
    maxHeight: "50vh",
    //minHeight: "36vh",
  },
  titleClass: {
    padding: globalTheme.spacing(1),
    color: globalTheme.palette.secondary.dark,
  },
  tableHeaderClass: {
    backgroundColor: globalTheme.palette.secondary.light,
    "& th": {
      fontWeight: globalTheme.typography.fontWeightMedium,
    },
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
  renderSubTable: (row: T) => ReactNode; //
}

/*
 * Displays the qualitative data table
 * Associated to the current context taxon
 * displaying:
 *      taxon_id (transformed to the taxon_name),
 *      measurement_name, measurement_desc, min_valu, max_value, unit
 */
const QualitativeData = <T extends Record<string, string | number | null>>(props: TableProps<T>) => {
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
        <TableContainer className={classes.tableClass}>
          <Table aria-label="collapsible table" size="small" stickyHeader>
            <TableHead>
              <TableRow className={classes.tableHeaderClass}>
                <TableCell>Options</TableCell>
                {props.columns.map((column) => (
                  <TableCell key={column.field as string}>{column.headerName}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.slice(startIndex, endIndex).map((row) => (
                <RowCollapse
                  row={row}
                  columns={props.columns}
                  rowID={props.getRowID(row)}
                  renderSubTable={props.renderSubTable}
                />
              ))}
            </TableBody>
          </Table>
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

export default QualitativeData;
