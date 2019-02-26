import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import formatDate from '../../utils/date';
import AceEditor from '../editor/AceEditor';

class UploadForm extends Component {

	state = {
		pasteData: 'abc',
		url: '',
		date: formatDate(new Date()),
		status: '',
		editor: ''
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = () => {
		let pasteData = this.state.editor.getValue().replace(/\t/g, "    ");
		this.setState({ pasteData }, this.upload);
	}

	upload = () => {
		console.log(this.state.pasteData);
		if (this.validateForm()) {
			let {editor, status, ...data} = this.state;
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
	}

	validateForm = () => {
		let url = this.state.url;
		const reservedWords = ['download', 'panel', 'upload', 'pdf', 'delete', 'uploadform'];
		for (let i = 0; i < reservedWords.length; i++) {
			if (url === reservedWords[i]) {
				this.setState({ status: '* Url is a reserved word. Please change it' });
				return false;
			}
		}
		let splChars = "* |,\":<>[]{}`\\';()@&$#%";
		for (let i = 0; i < url.length; i++) {
			if (splChars.indexOf(url[i]) !== -1) {
				this.setState({ status: '* URL cannot contain special characters or spaces' });
				return false;
			}
		}
		if (!this.state.pasteData) {
			this.setState({ status: '* Your Paste Connot Be Empty' })
			return false;
		}
		if (!url) {
			this.setState({ status: '* Please Enter URL' })
			return false;
		}
		return true;
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
					Upload Your Paste
        </Typography>
				<form autoComplete="off" style={{ width: '80%', margin: '0% 8%' }}>
					<AceEditor
						getEditor={this.getEditor}
					/>
					<TextField
						disabled
						id="standard-disabled"
						value="codebinn.herokuapp.com/d/"
						margin="normal"
						style={{ maxWidth: '58%' }}
					/>
					<TextField
						id="standard-name"
						label="Url"
						value={this.state.name}
						name="url"
						onChange={this.handleChange}
						margin="none"
						style={{ maxWidth: '40%' }}
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
							Upload
            </Fab>
					</div>
				</form>
			</Fragment>
		)
	}
}

export default UploadForm;