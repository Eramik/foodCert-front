import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Grid, Button, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { getAllUsers, toggleAdmin } from '../services/data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import config from '../config/config';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat)
dayjs.extend(utc);

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

  const [userData, setUserData] = useState([]);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleToggleAdmin = async (userId, isAdmin) => {
    setLoadingUserData(true);
    const { users } = await toggleAdmin(authToken, userId, !isAdmin);
    setUserData(users);
    setLoadingUserData(false);
  }

  const USER_COLUMNS = [
    {
      title: 'Sign up date',
      field: 'createdAt',
      render: p =>
        dayjs(p.updatedAt)
          .local()
          .locale('en')
          .format('lll'),
    },
    {
      title: 'Email',
      field: 'email',
    },
    {
      title: 'First name',
      field: 'firstName',
    },
    {
      title: 'Last name',
      field: 'lastName',
    },
    {
      title: 'Is admin?',
      field: 'isAdmin',
      render: (u) => u.isAdmin ? "Admin" : 'Not admin'
    },
    {
      title: '',
      field: 'isAdmin',
      render: (u) => {
        return (
          <Button variant='outlined' color="primary" onClick={() => handleToggleAdmin(u._id, u.isAdmin)}>
            Toggle admin
          </Button>
        );
      }
    },
  ];

  const loadUserData = async (setLoading = false) => {
    try {
      if (setLoading) {
        setLoadingUserData(true);
      }
      const { users } = await getAllUsers(authToken);
      setUserData(users);
      setDataLoaded(true);
      setLoadingUserData(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!dataLoaded) {
      loadUserData();
    }
  });

  
  return (
    <React.Fragment>
      {loadingUserData && <LinearProgress />}
      <MaterialTable 
        title={"Users"}
        columns={USER_COLUMNS}
        data={userData}
        options={{
          sorting: true,
          pageSize: 10,
        }}
      />
    </React.Fragment>
  );
}