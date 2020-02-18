import React from 'react';
import { withTvMazeProvider, useTvMazeState } from './context';
import useTvMaze from './useTvMaze';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Paper } from '@material-ui/core';
import { JahCard, JahSearch } from '../../components';

const useStyles = makeStyles(theme => ({
  divider: { marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
  paper: { padding: theme.spacing(2) }
}));

const TvMaze = () => {
  const classes = useStyles();
  const state = useTvMazeState();
  const { handleSearch, handleSubmit } = useTvMaze();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <JahSearch handleChange={handleSearch} />
        {!state.data.length || <>found {state.data.length} results. </>}
      </form>
      <Divider className={classes.divider} />
      {!state.isError || <Paper className={classes.paper}>Search Error</Paper>}
      {state.isLoading ? (
        <Paper className={classes.paper}>Loading...</Paper>
      ) : (
        <>
          {state.data.length === 0 ? (
            <Paper className={classes.paper}>No Results</Paper>
          ) : (
            <Grid container spacing={3}>
              {state.data.map((value, index) => (
                <Grid item key={index} lg={4} md={4} sm={6} xl={3} xs={12}>
                  <JahCard data={value} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default withTvMazeProvider(TvMaze);
