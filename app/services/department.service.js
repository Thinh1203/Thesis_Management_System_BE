const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const addDepartment = async (data) => {
    const result = await db.departments.create({
        code: data.code,
        description: data.description
    }); 
    return result;
}

const updateDepartment = async (data, id) => {
    const check = await db.departments.findOne({ where: { id: id }});
    if(!check) {
        return BadRequestError(400, 'Department not found'); 
    }
    const result = await db.departments.update(data, { where: { id:id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.departments.findOne({ where: { id: id }});
    if(!check) {
        return BadRequestError(400, 'Department not found'); 
    }
    const result = await db.departments.findOne({ where: { id: id }});
    return result;
}

const getAll = async () => {
    const result = await db.departments.findAll();
    return result;
}

const deleteDepartment = async (id) => {
    const check = await db.departments.findOne({ where: { id: id }});
    if(!check) {
        return BadRequestError(400, 'Department not found'); 
    }
    const result = await db.departments.destroy({ where: { id: id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

module.exports = {
    addDepartment,
    updateDepartment,
    getOne, 
    getAll,
    deleteDepartment
}