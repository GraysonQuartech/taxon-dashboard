/** @format */
//IMPORT React and Child Components
import React, { ReactNode } from "react";
import RowCollapse from "./RowCollapse";
import TaxonBubble from "./TaxonBubble";
//IMPORT MUI packages
import { Grid, IconButton, Paper, TablePagination, Theme } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
//IMPORT Datasets+Constants
import { IColumn } from "../utils/constants";
import { useTaxon } from "../contexts/taxonContext";
import AddRow from "./AddRow";
//IMPORT helper functions

const useStyles = makeStyles((globalTheme: Theme) => ({
  tableClass: {
    //height: "58vh",
    //maxHeight: "50vh",
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
  taxonNameClass: {
    display: "inline-block",
  },
  headerGridClass: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: globalTheme.spacing(1),
    paddingTop: globalTheme.spacing(2),
  },
  tableFooterClass: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2px",
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
  const { contextTaxon } = useTaxon();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openAddNewRow, setOpenAddNewRow] = React.useState(false);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddRowClick = () => {
    setOpenAddNewRow(true);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  //RETURN ELEMENT
  return (
    <div>
      <div className={classes.headerGridClass}>
        <div className={classes.taxonNameClass}>{contextTaxon && <TaxonBubble taxonID={contextTaxon.taxon_id} />}</div>
        <Typography variant="h6" className={classes.titleClass}>
          {props.tableName}
        </Typography>
      </div>

      <Paper>
        <TableContainer className={classes.tableClass}>
          <Table aria-label="collapsible table" size="small" stickyHeader>
            <TableHead>
              <TableRow className={classes.tableHeaderClass}>
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
              <AddRow open={openAddNewRow} setOpen={setOpenAddNewRow} columns={props.columns} />
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.tableFooterClass}>
          <IconButton onClick={() => handleAddRowClick()}>
            <AddIcon />
            <Typography className={classes.titleClass}>Add Row</Typography>
          </IconButton>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div>
  );
};

export default QualitativeData;
