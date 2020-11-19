import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Grid, Button, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { getAllTransportationsForUser, generateTransportation } from '../services/data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import config from '../config/config';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat)
dayjs.extend(utc);

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
  generateButton: {
    marginLeft: theme.spacing(3)
  }
}));

export default function Transportations({ authToken }) {
  const classes = useStyles();
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
          .format('lll'),
    },
    {
      title: 'Min temp set',
      field: 'minimalAllowedTemperature',
      render: (tp) => tp.minimalAllowedTemperature + '°C'
    },
    {
      title: 'Max temp set',
      field: 'maximalAllowedTemperature',
      render: (tp) => tp.maximalAllowedTemperature + '°C'
    },
    {
      title: 'Certificate status',
      field: 'certificatePath',
      render: p => {
        if (p.score < 0) {
          return 'Not certified';
        }
        if (!p.certificatePath) {
          return;
        }

        const href = `${config.serverBaseURL}/certificate/${p._id.toString()}?authToken=${authToken}`;
        return (
          <a href={href} target="_blank">
            <Button variant="outlined" color="primary" style={{ textDecoration: 'none' }}>
              Open certificate
            </Button>
          </a>
        );
      }
    },
    {
      title: 'Score',
      field: 'score',
    },
  ];
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

  const handleGenerate = async () => {
    setLoadingTransportationData(true);
    const { transportations } = await generateTransportation(authToken);
    setTransportationData(transportations);
    setLoadingTransportationData(false);
  }
  

  return (
    <React.Fragment>
      {loadingTransportationData && <LinearProgress />}
      <MaterialTable 
        title={
          <>
            <Typography variant="h5">
              {"Recent Transportations"}
              <Button variant="outlined" color="primary" onClick={handleGenerate} className={classes.generateButton}>
                Generate one more sample
              </Button>
            </Typography>
          </>
        }
        columns={TRANSPORTATION_COLUMNS}
        data={transportationData}
        options={{
          sorting: true,
          pageSize: 10,
        }}
        detailPanel={(t) => {
          return (
            <Grid item className={classes.profiles}>
              <MaterialTable
                title="Temperature Profiles"
                options={{
                  sorting: true,
                }}
                columns={TEMPERATURE_PROFILE_COLUMNS}
                data={t.temperatureMaps.map(tmap => { tmap.min = t.minimalAllowedTemperature; return tmap; })
                                       .map(tmap => { tmap.max = t.maximalAllowedTemperature; return tmap; })}
                detailPanel={(tmap => {
                  return (
                    <Grid item className={classes.profiles}>
                      <MaterialTable 
                        title="Temperature Points"
                        options={{
                          sorting: true,
                          pageSize: 10,
                        }}
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