import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { getAllTransportationsForUser } from '../services/data';
import dayjs from 'dayjs';

const TRANSPORTATION_COLUMNS = [
  {
    title: '_id',
    field: '_id',
    hidden: true,
  },
  {
    title: 'Date',
    field: 'createdAt',
    render: p =>
      dayjs(p.updatedAt)
        .locale('en')
        .toString(),
  },
  {
    title: 'Min temp',
    field: 'minimalAllowedTemperature',
  },
  {
    title: 'Max temp',
    field: 'maximalAllowedTemperature',
  },
  {
    title: 'Certificate status',
    field: 'certificatePath',
    render: p => {
      if (p.score < 0) {
        return 'Not certified';
      }
      if (!p.certificatePath) {
        return 'Certified';
      }
      return p.certificatePath;
    }
  },
  {
    title: 'Score',
    field: 'score',
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

export default function Transportations({ authToken }) {
  const classes = useStyles();
  const [transportationData, setTransportationData] = useState([]);
  const [loadingTransportationData, setLoadingTransportationData] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadTransportationData = async (setLoading = false) => {
    try {
      if (setLoading) {
        setLoadingTransportationData(true);
      }
      const { transportations } = await getAllTransportationsForUser(authToken);
      setTransportationData(transportations);
      setDataLoaded(true);
      setLoadingTransportationData(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!dataLoaded) {
      loadTransportationData();
    }
  });
  

  return (
    <React.Fragment>
      {loadingTransportationData && <LinearProgress />}
      <MaterialTable 
        title="Recent Transportations"
        columns={TRANSPORTATION_COLUMNS}
        data={transportationData}
      />
    </React.Fragment>
  );
}