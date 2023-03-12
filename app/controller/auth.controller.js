const db = require('../config/database.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    const { account, password } = req.body;

    const checkUser = await db.users.findOne({ where: { account: account }});
    if(!checkUser) 
        return res.status(400).json({ message: 'User is not found!'});
    if(!bcrypt.compareSync(password, checkUser.password)) 
    return res.status(400).json({ message: 'Password is not match!'});

    const userRole = await db.roles.findOne({ where: { id: checkUser.id }});

    const jwtToken = jwt.sign({ 
        id: checkUser.id, 
        account: checkUser.account, 
        role: userRole.code }, process.env.JWT_SECRET);
    return res.status(200).json({ token: jwtToken });
}


module.exports = {
    login,

}