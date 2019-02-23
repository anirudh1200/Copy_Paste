import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import AddIcon from '@material-ui/icons/Add';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  let backgroundColor = grey[900];
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor}}>
        <Toolbar className={classes.root}>
          <Typography variant="h6" color="inherit" style={{letterSpacing: '0.5em', fontSize: '1.5em'}}>
            COPYPASTE
          </Typography>
          <Link to='/uploadForm' style={{margin:0, padding:0}}>
            <AddIcon
              fontSize="large"
              style={{position: 'absolute', right: '5%', top: '25%' ,color: 'white', height: '50%'}}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);