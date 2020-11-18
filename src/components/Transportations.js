import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const TRANSPORTATION_COLUMNS = [
  {
    title: '_id',
    field: '_id',
    hidden: true,
  },
  {
    title: 'ownerId',
    field: 'owner._id',
    hidden: true,
  },
  {
    title: 'Ask owner',
    field: 'askOwner.profile.name',
  },
  {
    title: 'Ask body',
    field: 'ask.body',
  },
  {
    title: 'Ask tags',
    field: 'tags',
    render: p => (p.ask.tags ? p.ask.tags.join(', ') : ''),
  },
  {
    title: 'Offer owner',
    field: 'offerOwner.profile.name',
  },
  {
    title: 'Offer body',
    field: 'offer.body',
  },
  {
    title: 'Offer tags',
    field: 'tags',
    render: p => (p.offer.tags ? p.offer.tags.join(', ') : ''),
  },
  {
    title: 'Status',
    field: 'approved',
    render: p => p.approved ? 'Approved' : 'Denied'
  },
  {
    title: 'Moderated by',
    field: 'moderatedBy',
    render: p => p.moderatedBy && (p.moderatedBy.user ? p.moderatedBy.user.profile.name : 
                  p.moderatedBy.slackUser && p.moderatedBy.slackUser.name + ' (from Slack)')
  },
  {
    title: 'Date',
    field: 'updatedAt',
    render: p =>
      dayjs(p.updatedAt)
        .locale('en')
        .format('YYYY-MM-DD'),
  },
];


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  

  return (
    <React.Fragment>
      <Title>Recent Transportations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}