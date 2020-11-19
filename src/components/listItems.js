import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
    </div>
  );
};