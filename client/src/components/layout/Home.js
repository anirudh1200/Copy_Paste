import React, { Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';

const Home = props => {
    let backgroundColor = grey[900];
    const redirectToUpload = () => {
        props.history.push('/uploadform');
    }
    return(
        <Fragment>
            <div style={{margin: '5% 5%', textAlign: 'center'}}>
                <Typography variant="h5" gutterBottom style={{marginBottom: 25}}>
                    Upload a paste
                </Typography>
                <Typography variant="h5" gutterBottom style={{marginBottom: 25}}>
                    Go To http://localhost:5000/(url) to download in .txt format
                </Typography>
                <Typography variant="h5" gutterBottom style={{marginBottom: 25}}>
                    Go To http://localhost:5000/pdf/(url) to download in .pdf format
                </Typography>
            </div>
            <Fab
              variant="extended"
              aria-label="Delete"
              style={{position: 'fixed', bottom: '30%', right: '45%', backgroundColor, color: 'white', fontSize: '1.5em', height: '75px', width: '175px'}}
              onClick={redirectToUpload}
              size='large'
            >
                <NavigationIcon size='large' />
                {"Upload"}
            </Fab>
        </Fragment>
    );
}

export default Home;