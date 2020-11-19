import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Grid, Button, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { useState, useEffect } from 'react';
import { getAllUsers, toggleAdmin } from '../services/data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cfg from '../config/config'
import { useCookies } from 'react-cookie';
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
  const [cookies] = useCookies();
  const langPack = cfg[cookies.lang ? cookies.lang : 'en'];

  const handleToggleAdmin = async (userId, isAdmin) => {
    setLoadingUserData(true);
    const { users } = await toggleAdmin(authToken, userId, !isAdmin);
    setUserData(users);
    setLoadingUserData(false);
  }

  const USER_COLUMNS = [
    {
      title: langPack.signUpDate,
      field: 'createdAt',
      render: p =>
        dayjs(p.updatedAt)
          .local()
          .format('lll'),
    },
    {
      title: langPack.email,
      field: 'email',
    },
    {
      title: langPack.firstName,
      field: 'firstName',
    },
    {
      title: langPack.lastName,
      field: 'lastName',
    },
    {
      title: langPack.isAdmin,
      field: 'isAdmin',
      render: (u) => u.isAdmin ? langPack.admin : langPack.notAdmin
    },
    {
      title: '',
      field: 'isAdmin',
      render: (u) => {
        return (
          <Button variant='outlined' color="primary" onClick={() => handleToggleAdmin(u._id, u.isAdmin)}>
            {langPack.toggleAdmin}
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