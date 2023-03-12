const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const addTopic = async (data) => {  
    const result = await db.topics.create({
        VietnameseName: data.VietnameseName,
        EnglishName: data.EnglishName,
        departmentId: data.departmentId
    }); 
    return result;
}

const updateTopic = async (data, id) => {
    
    const check = await db.topics.findOne( { where: {id:id}} );
    if(!check) {
        console.log(check);
        return BadRequestError(400, 'Topic not found!');
    }
    const result = await db.topics.update(data, {where: {id:id}});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.topics.findOne( { where: { id: id }});
    if(!check) {
        return BadRequestError(400, 'Topic not found!');
    }
    const result = await db.topics.findOne({
        attributes: { exclude: ['departmentId']},
        include: {
            model: db.departments,
            attributes: { exclude: ['id']}
        },
        where: { id: id }
    });
    return result;
}

const getAll = async () => {
    const result = await db.topics.findAll({
        include: {
            model: db.departments,
            attributes: { exclude: ['id']}
        }
    });
    return result;
}

const deleteTopic = async (id) => {
    const check = await db.topics.findOne({ where: { id: id }});
    if(!check)
        return BadRequestError(400, 'Topic not found!');
    const result = await db.topics.destroy({ where: { id: id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

module.exports = {
    addTopic,
    updateTopic,
    getOne, 
    getAll,
    deleteTopic
}