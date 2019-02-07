import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const styles = {
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  let backgroundColor = grey[800];
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor}} className={classes.root}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            CopyPaste
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);