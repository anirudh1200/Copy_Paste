import React, { Component } from 'react';
import List from '@material-ui/core/List';
import IndivisualItem from './IndivisualItem';
import { Consumer } from '../../context';

class PasteList extends Component {

    render(){
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
                                    />
                                )
                            })
                        }}
                    </Consumer>
                </List>
            </div>
        )
    }
}

export default PasteList;

