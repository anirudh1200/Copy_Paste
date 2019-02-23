import React, { Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';
import NavigationIcon from '@material-ui/icons/Navigation';
import backgroundImage from '../../background.jpg';

const Home = props => {
	let backgroundColor = grey[900];
	const redirectToUpload = () => {
		props.history.push('/uploadform');
	}
	return (
		<Fragment>
			<div style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				height: '91vh',
				position: 'flexible',
				top: '8%',
				bottom: 0,
				left: 0,
				right: 0
			}}>
				<Typography
					align="center"
					variant="h2"
					style={{
						fontFamily: "Major Mono Display",
						fontSize: "6vw",
						marginBottom: 15,
						paddingTop: "30vh",
						fontWeight: 'bold'
					}}
				>
					codebin
                </Typography>
				<Typography
					align="center"
					variant="h6"
					style={{ fontFamily: "Major Mono Display" }}
				>
					enjoy the ease of sharing
                </Typography>
				<Fab
					variant="extended"
					aria-label="Delete"
					onClick={redirectToUpload}
					size='large'
					style={{
						position: 'relative',
						left: '45%',
						backgroundColor,
						color: 'white',
						fontSize: '1.5em',
						height: '75px',
						width: '175px',
						marginTop: '2%'
					}}
				>
					<NavigationIcon size='large' />
					{"Upload"}
				</Fab>
			</div>
		</Fragment>
	);
}

export default Home;