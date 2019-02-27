import React, { Component, Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import AceEditor from '../editor/AceEditor';

class Edit extends Component {

	state = {
		pasteData: '',
		url: ''
	}

	componentDidMount = () => {
		let url = this.props.location.pathname.slice(6);
		this.setState({ url });
		this.getData(url);
	}

	getData = (url) => {
		fetch(`http://localhost:5000/d/view/${url}`)
			.then(res => res.json())
			.then(res => this.setState({ pasteData: res.pasteData }))
			.catch(console.log);
	}

	handleSubmit = () => {
		let pasteData = this.state.editor.getValue().replace(/\t/g, "    ");
		this.setState({ pasteData }, this.upload);
	}

	upload = () => {
		let { editor, status, ...data } = this.state;
		console.log(data);
		fetch("/d/upload", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					this.props.history.push('/');
				}
			})
			.catch(console.log);
	}

	getEditor = (editor) => {
		this.setState({ editor });
	}

	render() {
		return (
			<Fragment>
				<Typography
					variant="h4"
					style={{ width: '100%', margin: '1% 0%', textAlign: 'center', color: grey[800] }}
				>
					Update {this.state.url}
				</Typography>
				<form autoComplete="off" style={{ width: '90%', margin: '0% 5%' }}>
					<AceEditor
						initialValue={this.state.pasteData}
						name="pasteData"
						getEditor={this.getEditor}
						numberOfLines={34}
					/>
					<div style={{ marginTop: '2%', textAlign: 'center', marginBottom: '30px' }}>
						<div style={{ color: 'red' }}>{this.state.status}</div>
						<Fab
							variant="extended"
							aria-label="Delete"
							onClick={this.handleSubmit}
							style={{
								color: grey[50],
								backgroundColor: grey[800]
							}}
						>
							<NavigationIcon style={{ color: grey[50] }} />
							Update
            </Fab>
					</div>
				</form>
			</Fragment>
		)
	}
}

export default Edit;