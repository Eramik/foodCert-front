import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleIcon from '@material-ui/icons/People';
import BackupIcon from '@material-ui/icons/Backup';
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from 'react-router-dom';
import cfg from '../config/config'
import { useCookies } from 'react-cookie';


export const MainListItems = () => {
  const [cookies] = useCookies();
  const langPack = cfg[cookies.lang ? cookies.lang : 'en'];

  return (
    <div>
      <ListItem button to={'/dashboard'} component={Link}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={langPack.myTranspTitle} />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  const [cookies] = useCookies();
  const langPack = cfg[cookies.lang ? cookies.lang : 'en'];
  
  return (
    <div>
      <ListSubheader inset>{langPack.adminPanelTitle}</ListSubheader>
      <ListItem button to={'/dashboard/admin/all'} component={Link}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={langPack.transps} />
      </ListItem>
      <ListItem button to={'/dashboard/admin/users'} component={Link}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={langPack.users} />
      </ListItem>
      <ListItem button to={'/dashboard/admin/backup'} component={Link}>
        <ListItemIcon>
          <BackupIcon />
        </ListItemIcon>
        <ListItemText primary={langPack.backup} />
      </ListItem>
    </div>
  );
};