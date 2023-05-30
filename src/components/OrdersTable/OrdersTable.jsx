import * as React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from 'react-redux';

function Row({ order }) {
  const [open, setOpen] = React.useState(false);
  const orderDate = new Date(order.date);
  const dateFormat = orderDate.getFullYear() + "-" + ((orderDate.getMonth() + 1).length !== 2 ? "0" + (orderDate.getMonth() + 1) : (orderDate.getMonth() + 1)) + "-" + orderDate.getDate();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {order.date}
        </TableCell>
        <TableCell component='th' scope='row' align='right'>Completed</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Date
                    </TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.products.map((item, index) => (
                    <TableRow>
                      <TableCell component='th' scope='row' >
                        {dateFormat}
                      </TableCell>
                      <TableCell component='th' scope='row' key={item.title}>
                        {item.title}
                      </TableCell>
                      <TableCell component='th' scope='row' key={index} align='right'>
                        {item.quantity}
                      </TableCell>
                      <TableCell component='th' scope='row' align='right'>
                        {(item.price / 100 * (100 - item.discountPercentage)).toFixed(2)}
                      </TableCell>
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

export default function OrdersTable() {
  const orders = useSelector(state => state.orders.orders);
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Order No.</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <Row key={order.date} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
