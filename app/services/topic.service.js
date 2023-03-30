const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');
let csv = require('csvtojson');

const addTopic = async (data, file) => {  
    let result;
    let listTopic = [];
    if(file) {
        const topic = await csv().fromFile(file.path);
        for (const element of topic) {
            try{
                result = await db.topics.create({
                    VietnameseName: element.VietnameseTopicName,
                    EnglishName: element.EnglishTopicName,
                });
                listTopic.push(result);
            } catch(err){
                return err;
            }
        }
        return listTopic;
    }
    result = await db.topics.create({
        VietnameseName: data.VietnameseName,
        EnglishName: data.EnglishName,
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
        where: { id: id }
    });
    return result;
}

const getAll = async () => {
    const result = await db.topics.findAll();
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