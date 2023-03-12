const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const addRole = async (data) => {
    if(!data.code || !data.description) {
        return new BadRequestError(400,'Data is not empty!');
    }
    const result = await db.roles.create({
        code: data.code,
        description: data.description
    });
    return result;
}

const updateRole = async (data, id) => {
    const check = await db.roles.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Role not found!');
    }
    const result = await db.roles.update(data, {where: {id:id}});
    return (result) ? ({message: 'Update successful'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.roles.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Role not found!');
    }
    const result = await db.roles.findOne({ where: { id: id }});
    return result;
}

const getAll = async () => {
    const result = await db.roles.findAll();
    return result;
}

const deleteRole = async (id) => {
    const check = await db.roles.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Role not found!');
    }
    const result = await db.roles.destroy({ where: { id: id }});
    return (result) ? ({message: 'Delete successful'}) : ({message: 'error'});
}

module.exports = {
    addRole,
    getAll,
    getOne,
    updateRole,
    deleteRole
}