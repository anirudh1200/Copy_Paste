import React, { Component } from 'react';
import List from '@material-ui/core/List';
import IndivisualItem from './IndivisualItem';

class PasteList extends Component {

    render(){
        return(
            <div>
                <List>
                    <IndivisualItem />
                </List>
            </div>
        )
    }
}

export default PasteList;

