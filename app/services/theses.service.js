const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');

const addTheses = async (data) => {  
    if(!data.code || !data.startDate || !data.endDate || !data.student || !data.lecturer) {
        return BadRequestError(400, 'Data is not empty!');
    }
    const result = await db.theses.create({
        code: data.code,
        startDate: data.startDate,
        endDate: data.endDate,
        student: data.student,
        lecturer: data.lecturer,
        topicId: data.topicId,
        departmentId: data.departmentId,
        shoolYearId: data.schoolYearId
    }); 
    return result;
}

const updateTheses = async (data, id) => {
    const check = await db.theses.findOne( { where: {id:id}} );
    if(!check) {

        return BadRequestError(400, 'Theses not found!');
    }
    const result = await db.theses.update(data, {where: {id:id}});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.theses.findOne( { where: { id: id }});
    if(!check) {
        return BadRequestError(400, 'Theses not found!');
    }
    const result = await db.theses.findOne({
        attributes: {exclude: ['topicId', 'departmentId', 'schoolYearId']},
    
        include: [
            { 
                model: db.topics,
                attributes: { exclude: ['id']}
            },
            {
                model: db.departments,
                attributes: { exclude: ['id']}
            },
            {
                model: db.schoolYears,
                attributes: { exclude: ['id']}
            }
            ],
        where: { id: id }
    });
    return result;
}

const getAll = async () => {
    const result = await db.theses.findAll({
        attributes: {exclude: ['topicId', 'departmentId', 'schoolYearId']},
        include: [
        { 
            model: db.topics,
            attributes: { exclude: ['id']}
        },
        {
            model: db.departments,
            attributes: { exclude: ['id']}
        },
        {
            model: db.schoolYears,
            attributes: { exclude: ['id']}
        }
        ]
    });
    return result;
}

const deleteTheses = async (id) => {
    const check = await db.theses.findOne({ where: { id: id }});
    if(!check)
        return BadRequestError(400, 'Theses not found!');
    const result = await db.theses.destroy({ where: { id: id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const uploadFile = async (file, id) => {
    const theses = await db.theses.findOne( { where: {id:id}} );
    if(!theses) {
        return BadRequestError(400, 'Theses not found!');
    }
    if(!file) {
        return BadRequestError(400, 'File is not empty!');
    } 
    const result = await db.theses.update({reportFile: file.path}, {where: {id:id}});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}


module.exports = {
    addTheses,
    getAll,
    getOne,
    updateTheses,
    deleteTheses,
    uploadFile
}