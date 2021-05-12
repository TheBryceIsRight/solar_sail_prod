import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(
  merchant_name: string,
  dba: string,
  pricing_method: string,
  tax_id: number,
  city: string,
  state: string,
) {
  return {
    merchant_name,
    dba,
    pricing_method,
    tax_id,
    city,
    state,
    history: [
      { depositing_bank: 'U.S. Bank', client_grp_num: '11091700', mid: 1234567891234 , address: "123 Peachtree St NE", postal: "12345", ldd: "01/01/2022"},
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.merchant_name}
        </TableCell>
        <TableCell align="right">{row.dba}</TableCell>
        <TableCell align="right">{row.tax_id}</TableCell>
        <TableCell align="right">{row.pricing_method}</TableCell>
        <TableCell align="right">{row.city}</TableCell>
        <TableCell align="right">{row.state}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                More Information
              </Typography>
              <Box margin={1}></Box>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Depositing Bank</TableCell>
                    <TableCell>Client Group Number</TableCell>
                    <TableCell align="right">MID</TableCell>
                    <TableCell align="right">LDD</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Postal Code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.depositing_bank} >
                      <TableCell component="th" scope="row" >
                        {historyRow.depositing_bank}
                      </TableCell>
                      <TableCell >{historyRow.client_grp_num}</TableCell>
                      <TableCell align="right">{historyRow.mid}</TableCell>
                      <TableCell align="right">{historyRow.ldd}</TableCell>
                      <TableCell align="right">{historyRow.address}</TableCell>
                      <TableCell align="right">{historyRow.postal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Merchant 1', 'DBA', 'Some Pricing Method', 12345678, 'Atlanta', 'GA'),
  createData('Merchant 2', 'DBA', 'Some Pricing Method', 12345678, 'Atlanta', 'GA'),
  createData('Merchant 3', 'DBA', 'Some Pricing Method', 12345678, 'Atlanta', 'GA'),
  createData('Merchant 4', 'DBA', 'Some Pricing Method', 12345678, 'Atlanta', 'GA'),
  createData('Merchant 5', 'DBA', 'Some Pricing Method', 12345678, 'Atlanta', 'GA'),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Merchant&nbsp;Name</TableCell>
            <TableCell align="right">DBA</TableCell>
            <TableCell align="right">Tax&nbsp;ID</TableCell>
            <TableCell align="right">Pricing&nbsp;Method</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.merchant_name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}