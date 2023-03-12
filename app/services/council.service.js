const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const createCouncil = async (data) => {  

    if(!data.code){
        return new BadRequestError(400,'Code is not empty!');
    }
    if(!data.chairperson){
        return new BadRequestError(400,'Chairperson position is not empty!');
    }
    if(!data.secretary){
        return new BadRequestError(400,'Secretary position is not empty!');
    }
    if(!data.counter){
        return new BadRequestError(400,'Counter position is not empty!');
    }
    if(!data.start_date){
        return new BadRequestError(400,'Start date is not empty!');
    }
    const result = await db.councils.create({
        code: data.code,
        chairperson: data.chairperson,
        secretary: data.secretary,
        counter: data.counter,
        start_date: data.start_date
    }); 
    return result;
}

const updateCouncil = async (data, id) => {
    const check = await db.councils.findPk(id);
    if(!check) return BadRequestError(400, 'Council not found!');
    const result = await db.councils.update(data, {where: {id:id}});
    return result;
}

const getOne = async (id) => {
    const check = await db.councils.findOne( { where: { id: id }});
    if(!check) 
        return BadRequestError(400, 'Council not found!');
    const result = await db.councils.findOne({ where: { id: id }});
    return result;
}

const getAll = async () => {
    const result = await db.councils.findAll();
    return result;
}

const deleteOne = async (id) => {
    const check = await db.councils.findOne({ where: { id: id }});
    if(!check)
        return BadRequestError(400, 'Council not found!');
    const result = await db.councils.destroy({ where: { id: id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

module.exports = {
    createCouncil,
    updateCouncil,
    getOne, 
    getAll,
    deleteOne
}