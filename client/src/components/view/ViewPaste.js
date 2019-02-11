import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import grey from '@material-ui/core/colors/grey';

const styles = {
  appBar: {
    position: 'relative',
    backgroundColor: grey[900]
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ViewPaste extends React.Component {
  state = {
    open: true,
    url: '',
    set: 0
  };

  componentDidMount = () => {
    let url = this.props.location.pathname.slice(6);
    this.setState({url});
    this.getData(url);
  }

  pastedata = '';

  getData = (url) => {
    fetch(`http://localhost:5000/api/view/${url}`)
    .then(res => res.blob())
    .then(res => {
        let reader = new FileReader();
        reader.onload = () => {
            this.pasteData = reader.result;
            console.log(this.pasteData);
            this.setState({set: 1});
        }
        reader.readAsText(res);
    })
    .catch(console.log);
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex} style={{marginLeft:'1%'}}>
                {this.state.url}
              </Typography>
            </Toolbar>
          </AppBar>
          <div
            style={{margin:'2% 4%',padding:'2%',backgroundColor:grey[100],height:'100%',width:'88%',lineHeight:'1.5'}}
          >
            {this.pasteData}
          </div>
        </Dialog>
      </div>
    );
  }
}

ViewPaste.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewPaste);