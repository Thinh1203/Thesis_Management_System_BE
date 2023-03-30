const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');
const { Op } = require('sequelize');
const { sendMail } = require('../middleware/sendmail');

const create = async (user,file) => {
    if(!file) {
        return new BadRequestError(400,'File is not empty!');
    }
    const checkUser = await db.students.findOne({ where: { id: user.id }});
    if(!checkUser) {
        return new BadRequestError(400,'User not found!');
    }
    const result = await db.gradeIs.create({
        file: file.path
    });
    const student = await db.students.update({gradeiId: result.id}, { where: { id: user.id }});
    // const teacher = await db.teachers.findOne({ where: { [Op.and]: [{departmentId: student.departmentId}, {code: 'TK'}]}});
    return result;
}

const updateOne = async (data, id) => {
    const grade = await db.gradeIs.findOne({ where: { id: id }});
    if(!grade) {
        return new BadRequestError(400,'Not found!');
    }
    const user = await db.students.findOne({ where: { gradeiId: id }});

    const result = await db.gradeIs.update(data, {where: {id:id}});

    const gradeI = await db.gradeIs.findOne({ where: { id: id }});

    const subject = 'Đơn xin điểm i';
    let html = '';
    if(gradeI.status == 'yes'){
        html = `<p>Đơn xin điểm i của bạn đã được đồng ý!.</p>`;
    } else {
        html = `<p>Đơn xin điểm i của bạn đã bị từ chối!.</p>`;
    }
    sendMail(user.email, subject, html);
    return (result) ? ({message: 'Update successful'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.gradeIs.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Not found!');
    }
    const result = await db.gradeIs.findOne({
        include: [{
            model: db.students,
            attributes: { exclude: ['roleId', 'departmentId', 'gradeiId', 'createdAt', 'updatedAt', 'account', 'password']},
        }], 
        where: { id: id }
    });
    return result;
}

const getAll = async (user) => {
    const result = await db.students.findAll({
        attributes: { exclude: ['roleId', 'departmentId', 'gradeiId', 'createdAt', 'updatedAt', 'account', 'password']},
        include: [
            {
                model: db.gradeIs,
                attributes: { exclude: ['id']},
            },
            {
                model: db.roles,
                where: { code: 'SV' }
            }   
        ],
        where: {
            departmentId: user.department,
            gradeiId: { [Op.not]: null }
        }
    });
    return result;
}

const deleteOne = async (id) => {
    const check = await db.gradeIs.findOne({ where: { id: id }});
    if(!check) {
        return new BadRequestError(400,'Grade not found!');
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