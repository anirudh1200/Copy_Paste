import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import AceEditor from '../editor/AceEditor';

class View extends Component {
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
					<AceEditor />
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

export default View