const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const addApplication = async (file, data, user) => {
    if(!file) {
        return new BadRequestError(400,'File is not empty!');
    }
    const result = await db.pointi.create({
        file: file.filename,
        status: data.status,
        userId: user.id
    }); 
    return result;
}

const updateApplication = async (file, data, id) => {
    if(file) {
        data.file = file.filename;
    }
    const result = await db.pointi.update(data, {where: {id:id}});
    return result;
}

const getOne = async (id) => {
    const result = await db.pointi.findOne({ where: { id: id }});
    return result;
}

const getAll = async () => {
    const result = await db.pointi.findAll({
        include: [{
            model: db.users
        }]
    });
    return result;
}

const deleteApplication = async (id) => {
    const result = await db.pointi.destroy({ where: { id: id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

module.exports = {
    addApplication,
    updateApplication,
    getOne, 
    getAll,
    deleteApplication
}