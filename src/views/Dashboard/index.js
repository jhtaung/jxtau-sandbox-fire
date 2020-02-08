import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Paper } from '@material-ui/core';
import { Search } from '../../components';

const useStyles = makeStyles(theme => ({
  divider: { marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
  paper: { padding: theme.spacing(2) }
}));

const Dashboard = () => {
  const classes = useStyles();
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Search />
      <Divider className={classes.divider} />
      <Paper className={classes.paper}>
        Results...
      </Paper>
    </form>
  );
};

export default Dashboard;
