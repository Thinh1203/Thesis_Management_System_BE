const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const create = async (user,file) => {
    if(!file) {
        return new BadRequestError(400,'File is not empty!');
    }
    const checkUser = await db.users.findOne({ where: { id: user.id }});
    if(!checkUser) {
        return new BadRequestError(400,'User not found!');
    }
    const result = await db.gradeIs.create({
        file: file.path
    });
    const updateUser = await db.users.update({gradeiId: result.id}, { where: { id: user.id }});
    return result;
}

const updateOne = async (data, id) => {
    const check = await db.gradeIs.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Role not found!');
    }
    const result = await db.gradeIs.update(data, {where: {id:id}});
    return (result) ? ({message: 'Update successful'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.gradeIs.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Role not found!');
    }
    const result = await db.gradeIs.findOne({ where: { id: id }});
    return result;
}

const getAll = async () => {
    const result = await db.gradeIs.findAll();
    return result;
}

const deleteOne = async (id) => {
    const check = await db.gradeIs.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Role not found!');
    }
    const result = await db.gradeIs.destroy({ where: { id: id }});
    return (result) ? ({message: 'Delete successful'}) : ({message: 'error'});
}

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne
}