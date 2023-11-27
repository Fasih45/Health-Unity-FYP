import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import LayersIcon from '@mui/icons-material/Layers';

import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Medical History" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HistoryEduOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Search
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <PersonSearchOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MedicalServicesOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Labs" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <VaccinesOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Pharmancy" />
    </ListItemButton>
  </React.Fragment>
);
