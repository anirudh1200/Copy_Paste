import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import grey from '@material-ui/core/colors/grey';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteItem extends Component {

	state = {
		isHovered: false
	}

	handleDelete = () => {
		let url = this.props.paste.url;
		fetch(`/d/delete/${url}`)
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					console.log("Successful");
					this.props.handleDelete(url);
				} else {
					console.log("Unsuccessful");
				}
			})
			.catch(console.log);
	}

	handleMouseEnter = () => {
		this.setState({ isHovered: true });
	}

	handleMouseLeave = () => {
		this.setState({ isHovered: false });
	}

	render() {
		const { paste } = this.props;
		let listItemStyle;
		this.state.isHovered ? (listItemStyle = { backgroundColor: grey[200], margin: '0.5%' }) : (listItemStyle = { margin: '0.5%' });
		let iconStyle = { width: '20%', margin: 'auto' };
		return (
			<ListItem
				style={listItemStyle}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				<ListItemAvatar>
					< Avatar>
						<AssignmentIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText
					style={{ letterSpacing: '0.05em' }}
					primary={paste.url}
					secondary={paste.date}
				/>
				<DeleteIcon
					style={iconStyle}
					onClick={this.handleDelete}
				/>
			</ListItem>
		)
	}
}

export default DeleteItem;