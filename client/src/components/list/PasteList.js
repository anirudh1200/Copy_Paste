import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IndivisualItem from './IndivisualItem';
import { Consumer } from '../../context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import grey from '@material-ui/core/colors/grey';

class PasteList extends Component {

    redirectToUpload = () => {
        this.props.history.push('/upload');
    }

    render(){
        let backgroundColor = grey[900];
        let headingStyle = {width:'8%', padding: 'auto', textAlign: 'center'};
        return(
            <div style={{margin: '0% 5%'}}>
                <List>
                    <ListItem>
                        <ListItemText />
                        <p style={headingStyle}>.txt</p>
                        <p style={headingStyle}>.pdf</p>
                        <p style={headingStyle}>.View</p>
                    </ListItem>
                    <Consumer>
                        {({pasteList}) => {
                            console.log(pasteList);
                            return pasteList.map((paste, index) => {
                                return(
                                    <IndivisualItem
                                      paste={paste}
                                      key={index} 
                                    />
                                )
                            })
                        }}
                    </Consumer>
                </List>
                <Fab
                  aria-label="Add"
                  style={{position: 'fixed', bottom: '10%', right: '5%', backgroundColor, color: 'white'}}
                  onClick={this.redirectToUpload}
                >
                  <AddIcon fontSize="large" />
                </Fab>
            </div>
        )
    }
}

export default PasteList;

