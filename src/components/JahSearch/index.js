import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = props => {
  const classes = useStyles();
  const { handleChange } = props;
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
        placeholder="Search" />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton aria-label="search" className={classes.iconButton} type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
