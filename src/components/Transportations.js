import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { getAllTransportationsForUser } from '../services/data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TRANSPORTATION_COLUMNS = [
  {
    title: '_id',
    field: '_id',
    hidden: true,
  },
  {
    title: 'Date',
    field: 'transportationEndTime',
    render: p =>
      dayjs(p.updatedAt)
        .local()
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

const TEMPERATURE_PROFILE_COLUMNS = [
  {
    title: '_id',
    field: '_id',
    hidden: true,
  },
  {
    title: 'Date',
    field: 'creationTimestamp',
    render: p =>
      dayjs(p.creationTimestamp)
        .local()
        .locale('en')
        .format('hh:mm:ss')
        .toString(),
  },
  {
    title: 'Is valid?',
    field: 'isValid',
    render: p => {
      const valid = p.points.some(point => point < p.min || point > p.max);
      return valid ? 'Valid' : 'Invalid';
    }
  },
];

const TEMPERATURE_POINT_COLUMNS = [
  {
    title: '_id',
    field: '_id',
    hidden: true,
  },
  {
    title: 'x',
    field: 'x',
  },
  {
    title: 'y',
    field: 'y',
  },
  {
    title: 'z',
    field: 'z',
  },
  {
    title: 'Temperature',
    field: 'temperatureValue',
    render: (tp) => tp.temperatureValue + ' °C'
  },
];

const useStyles = makeStyles((theme) => ({
  profiles: {
    padding: theme.spacing(2),
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
        detailPanel={(t) => {
          return (
            <Grid item className={classes.profiles}>
              <MaterialTable
                title="Temperature Profiles"
                columns={TEMPERATURE_PROFILE_COLUMNS}
                data={t.temperatureMaps.map(tmap => { tmap.min = t.minimalAllowedTemperature; return tmap; })
                                       .map(tmap => { tmap.max = t.maximalAllowedTemperature; return tmap; })}
                detailPanel={(tmap => {
                  return (
                    <Grid item className={classes.profiles}>
                      <MaterialTable 
                        title="Temperature Points"
                        columns={TEMPERATURE_POINT_COLUMNS}
                        data={tmap.points}
                      />
                    </Grid>
                  );
                })}
              />
            </Grid>
          );
        }}
      />
    </React.Fragment>
  );
}