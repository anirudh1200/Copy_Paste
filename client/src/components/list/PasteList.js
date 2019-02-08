import React, { Component } from 'react';
import List from '@material-ui/core/List';
import IndivisualItem from './IndivisualItem';
import { Consumer } from '../../context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import grey from '@material-ui/core/colors/grey';

class PasteList extends Component {

    redirectToUpload = () => {
        this.props.history.push('/upload');
    }

    downloadFile = (url) => {
        fetch(`/api/download/${url}`);
    }

    render(){
        let backgroundColor = grey[900];
        return(
            <div style={{margin: '3% 5%'}}>
                <List>
                    <Consumer>
                        {({pasteList}) => {
                            console.log(pasteList);
                            return pasteList.map((paste, index) => {
                                return(
                                    <IndivisualItem
                                      paste={paste}
                                      key={index}
                                      downloadFile={this.downloadFile}
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

