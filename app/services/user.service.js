const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');
const bcrypt = require('bcryptjs');
const validation = require('../utils/validation');


const addUser = async (data) => {
    const user = await db.users.findOne({ where: { username: data.username }});
    if(user) return new BadRequestError(400,'Username already exists!');
    
    if(!validation.checkPhoneNumber(data.phone)) {
        return new BadRequestError(400, 'Phone number is not valid');
    }
    if(!validation.checkEmail(data.email)) {
        return new BadRequestError(400,'Email is not valid!');
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
        departmentId: data.departmentId
    });

    return result;
}

const update = async (data, id) => {
   const user = await db.users.findByPk(id);
    if(!user) return new BadRequestError(400,'user not found!');
    if(!validation.checkPhoneNumber(data.phone)) {
        return new BadRequestError(400, 'Phone number is not valid');
    }
    if(!validation.checkEmail(data.email)) {
        return new BadRequestError(400,'Email is not valid!');
    }
    const result = await db.users.update(data, { where: { id:id }});

    return (result[0]) ? ({message: 'Successfully'}) : ({message: 'error'});

}

const getAll = async () => {
   const department = db.departments;
    const user = await db.users.findAll({
        attributes: ['avatar','username','password','role','name','code','email','address','phone','gender','class','courses'],
        include: [{
            model: department,
            attributes: ['description']
        }]
    });
    return user;
}

const getOne = async (id) => {
    const user = await db.users.findOne({
        attributes: ['avatar','username','password','role','name','code','email','address','phone','gender','class','courses'],
        include: [{
            model: db.departments,
            attributes: ['description']
        }],
       where: {id:id}
    });

    if(!user) return new BadRequestError(400,'user not found!');
    return user;
}

const deleteOne = async (id) => {
    const user = await db.users.findByPk(id);
    if(!user) return new BadRequestError(400,'user not found!');
    const result = await db.users.destroy({ where: { id: id }});
    return (result[0]) ? ({message: 'Successfully'}) : ({message: 'error'});
}

module.exports = {
    addUser,
    getAll,
    getOne,
    update,
    deleteOne
}