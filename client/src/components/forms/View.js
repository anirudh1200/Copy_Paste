import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import AceEditor from '../editor/AceEditor';

class View extends Component {

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

	handleAceChange = (value) => {
		this.setState({ pasteData: value.replace(/\t/g, "    ") });
	}

	render() {
		return (
			<Fragment>
				<Typography
					variant="h4"
					style={{ width: '100%', margin: '1% 0%', textAlign: 'center', color: grey[800] }}
				>
					{this.state.url}
				</Typography>
				<form autoComplete="off" style={{ width: '80%', margin: '0% 8%' }}>
					<AceEditor
						initialValue={this.state.pasteData}
						name="pasteData"
						onChange={this.handleAceChange}
					/>
				</form>
			</Fragment>
		)
	}
}

export default View