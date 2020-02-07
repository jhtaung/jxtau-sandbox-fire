import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  ErrorOutline as ErrorOutlineIcon,
  Menu as MenuIcon,
  NotificationsNone as NotificationsNoneIcon,
  PeopleOutline as PeopleOutlineIcon,
} from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: { display: 'flex' },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: { flexGrow: 1, padding: theme.spacing(3) },
  drawer: { flexShrink: 0, width: drawerWidth, whiteSpace: 'nowrap' },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: { width: theme.spacing(9) + 1 }
  },
  list: { paddingTop: '75px' },
  listItem: { paddingLeft: '23px' },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
}));

const Layout = props => {
  const { content, location } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const routeName = location.pathname;

  const isSelected = pathName => routeName === pathName || (pathName === '/dashboard' && routeName === '/');

  const pages = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Not Found', path: '/not-found', icon: <ErrorOutlineIcon /> }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        position="fixed">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            className={classes.menuButton}
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} noWrap variant="h6">JXTAU</Typography>
          <Button color="inherit"><PeopleOutlineIcon /></Button>
          <Button color="inherit"><NotificationsNoneIcon /></Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open })}
        classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open }) }}
        open={open}
        variant="permanent">
        <List className={classes.list}>
          {pages.map((prop, key) => (
            <ListItem
              button
              className={classes.listItem}
              component={RouterLink}
              key={key}
              selected={isSelected(prop.path)}
              to={process.env.PUBLIC_URL + prop.path}>
              <ListItemIcon>{prop.icon}</ListItemIcon>
              <ListItemText primary={prop.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {content}
      </div>
    </div>
  );
}

Layout.propTypes = {
  content: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Layout);
