import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import grey from '@material-ui/core/colors/grey';

class IndivisualItem extends Component {

    state = {
        isHovered: false
    }
    
    downloadFile = (url) => {
        // An option
        // window.location = `http://localhost:5000/api/download/${url}`;
        // Second approach
        fetch(`http://localhost:5000/api/download/${url}`)
            .then(res => res.blob())
            .then(blob => {
                let Url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = Url;
                a.download = url + '.txt';
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();    
                a.remove();  //afterwards we remove the element again         
            });
    }

    handleMouseEnter = () => {
        this.setState({isHovered: true});
    }

    handleMouseLeave = () => {
        this.setState({isHovered: false});
    }

    render(){
        const {paste} = this.props;
        let listItemStyle
        this.state.isHovered ? (listItemStyle = {backgroundColor: grey[200], margin: '0.5%'}) : (listItemStyle = {margin: '0.5%'});
        return(
            <ListItem
              style={listItemStyle}
              onClick={() => this.downloadFile(paste.url)}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
                <ListItemAvatar>
                    < Avatar>
                        <AssignmentIcon />
                    </Avatar>
                </ListItemAvatar>
            <ListItemText
              style={{letterSpacing: '0.05em'}}
              primary={paste.url}
              secondary={paste.date}
            />
            </ListItem>
        )
    }
}

export default IndivisualItem;