const db = require('../config/database.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    const { account, password } = req.body;
    let checkUser = await db.teachers.findOne({ where: { account: account }});
    if(!checkUser) {
        checkUser = await db.students.findOne( { where: { account: account }});
    }
    if(!checkUser) 
        return res.status(404).json({ message: 'Tài khoản không tồn tại!'});
    if(!checkUser.status)
        return res.status(400).json({message: 'Tài khoản đã bị khóa'});
    if(!bcrypt.compareSync(password, checkUser.password)) 
    return res.status(403).json({ message: 'Mật khẩu không đúng!'});

    const userRole = await db.roles.findOne({ where: { id: checkUser.roleId }});


    const jwtToken = jwt.sign({ 
        id: checkUser.id, 
        account: checkUser.account, 
        role: userRole.code,
        department: checkUser.departmentId}, process.env.JWT_SECRET);
    return res.status(200).json({ token: jwtToken });
}


module.exports = {
    login,

}