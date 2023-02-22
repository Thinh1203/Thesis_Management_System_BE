const db = require('../config/database.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    const { username, password } = req.body;

    const checkUser = await db.users.findOne({ where: { username: username }});
    if(!checkUser) 
        return res.status(400).json({ message: 'User is not found!'});
    if(!bcrypt.compareSync(password, checkUser.password)) 
    return res.status(400).json({ message: 'Password is not match!'});

    const jwtToken = jwt.sign({ 
        id: checkUser.id, 
        username: checkUser.username, 
        role: checkUser.role }, process.env.JWT_SECRET);
    return res.status(200).json({ token: jwtToken });
}

const testLogin = async (req, res) => {
    return res.status(200).json({'login user':'ok'});
}

module.exports = {
    login,
    testLogin
}