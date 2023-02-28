const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');
const bcrypt = require('bcryptjs');
const validation = require('../utils/validation');


const addUser = async (data) => {
    const user = await db.users.findOne({ where: { username: data.username }});
    if(user) return BadRequestError(400,'Username already exists!');
    

    if(!validation.checkPhoneNumber(data.phone)) {
        return BadRequestError(400, 'Phone number is not valid');
    }
    if(!validation.checkEmail(data.email)) {
        return BadRequestError(400,'Email is not valid!');
    }
    const hashPassword = await bcrypt.hash(data.password,8); 
    const result = await db.users.create({
        username: data.username,
        password: hashPassword,
        role: data.role,
        name: data.name,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
    });

    return result;
}

const update = async (file, data, id) => {
   const user = await db.users.findByPk(id);
    if(!user) return BadRequestError(400,'user not found!');

    if(file){
        data.avatar = file.filename;
    }

    if(data.phone) {
        if(!validation.checkPhoneNumber(data.phone)) {
            return BadRequestError(400, 'Phone number is not valid');
        }
    }

    if(data.email) {
        if(!validation.checkEmail(data.email)) {
            return BadRequestError(400,'Email is not valid!');
        }
    }

    const result = await db.users.update(data, { where: { id:id }});
    return (result[0]) ? ({message: 'Successfully'}) : ({message: 'error'});

}

const getAll = async () => {
    const user = await db.users.findAll();
    return user;
}

const getOne = async (id) => {
    const user = await db.users.findOne({where: {id:id}});

    if(!user) return BadRequestError(400,'user not found!');
    return user;
}

const deleteOne = async (id) => {
    const user = await db.users.findByPk(id);
    if(!user) return BadRequestError(400,'user not found!');
    const result = await db.users.destroy({ where: { id: id }});
    console.log(result)
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const updatePassword = async (id, data) => {

   const user = await db.users.findOne({ where: { id: id }});
    if(!bcrypt.compareSync(data.password, user.password))
        return BadRequestError(400,'Password not match!');

    if(data.newPassword != data.confirmPassword)
        return BadRequestError(400,'New password and confirm password not match!');

     const newPass = await bcrypt.hash(data.newPassword, 8); 

    const result = await db.users.update({ password: newPass}, {where: { id: id }});
    return result;
}

module.exports = {
    addUser,
    getAll,
    getOne,
    update,
    deleteOne,
    updatePassword
}