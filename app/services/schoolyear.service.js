const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const addSchoolYear = async (data) => {
    const result = await db.schoolYears.create({
        year: data.year,
        semester: data.semester
    }); 
    return result;
}

const updateSchoolYear = async (data, id) => {
    const check = await db.schoolYears.findOne({ where: { id:id }});
    if (!check){
        return BadRequestError(400, 'Not found!'); 
    }
    const result = await db.schoolYears.update(data, {where: { id: id }});
    return  (result[0]) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const deleteOne = async (id) => {
    const check = await db.schoolYears.findOne({ where: { id:id }});
    if (!check){
        return BadRequestError(400, 'Not found!'); 
    }
    const result = await db.schoolYears.destroy({where: { id: id }});
    return  (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.schoolYears.findOne({ where: { id:id }});
    if (!check){
        return BadRequestError(400, 'Not found!'); 
    }
    const result = await db.schoolYears.findByPk(id);
    return  result;
}

const getAll = async () => {
    const result = await db.schoolYears.findAll();
    return  result;
}

module.exports = {
    addSchoolYear,
    updateSchoolYear,
    deleteOne,
    getOne,
    getAll
}