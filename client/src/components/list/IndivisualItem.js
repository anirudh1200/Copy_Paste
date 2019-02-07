import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

const IndivisualItem = props => {
    return(
        <ListItem>
            <ListItemAvatar>
                < Avatar>
                    <FolderIcon />
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