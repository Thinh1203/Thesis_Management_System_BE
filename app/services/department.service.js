const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const create = async (data) => {
    if(!data.code) return new BadRequestError(400,'Code can not be empty!');
    if(!data.description) return new BadRequestError(400,'Description can not be empty!');
    
    const codeExist = await db.departments.findOne({ where: { code: data.code }});
    if(codeExist) return new BadRequestError(400, 'Code already exist!');
    
    const result  = await db.departments.create ({
        code: data.code,
        description: data.description
    });
    
    return result;
}

const update = async (id, data) => {
    findDepartment = await db.departments.findOne({ where: { id: id }});
    if(!findDepartment) return new BadRequestError(400, 'Department not found!');
    return await db.departments.update(data, { where: { id: id }});  
}

const getAll = async () => {
    return await db.departments.findAll();
}

const getOne = async (id) => {
    const result = await db.departments.findByPk(id);
    if(!result) return new BadRequestError(400, 'Department not found!');
    return result;
}

const deleteOne = async (id) => {
    const findDepartment = await db.departments.findByPk(id);
    if(!findDepartment) return new BadRequestError(400, 'Department not found!');
    return await db.departments.destroy({ where: { id: id }});
}

module.exports = {
    create,
    update,
    deleteOne,
    getOne,
    getAll
}