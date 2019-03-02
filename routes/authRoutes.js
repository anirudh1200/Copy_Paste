const express 	= require('express'),
	  router 	= express.Router();

// @route   GET /auth/login
// @desc    verfies username and password
router.post('/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	// for production
	//if(username === process.env.COPY_USERNAME && password === process.env.COPY_PASSWORD){
	// for development
	if (username === 'dummy' && password === 'dummy') {
		res.json({ login: true });
	} else {
		res.json({ login: false });
	}
});

module.exports = router;