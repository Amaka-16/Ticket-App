const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.protect = async(req, res, next) => {
    let token;

    //check for token in headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    
    //if not token found, deny access
    // handling missing token -> if not token is provided, the middleware stops and sends a 401 error
    if(!token) {
        return res.status(401).json({ error: 'You are not logged in. Please log in to get access.'});
    }

    try{
        // verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // check if user is still in the database
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
        return res.status(401).json({ error: "The user belonging to this token does not exist"});
    }
     // attach the user data to the request object
     req.user = currentUser;

     // proceed to the next middle/controller
     next();
    } catch(err) {
        return res.status(401).json({ error: "Invalid token or token expired already"})
    }
};