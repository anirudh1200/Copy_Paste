import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';

const IndivisualItem = props => {
    const {paste} = props;
    console.log(paste);
    return(
        <ListItem style={{marginBottom: '2%'}}>
            <ListItemAvatar>
                < Avatar>
                    <AssignmentIcon />
                </Avatar>
            </ListItemAvatar>
        <ListItemText
          primary="Single-line item"
          secondary={"secondary"}
        />
        </ListItem>
    )
}

export default IndivisualItem;