const db = require('../config/database.config');
const { BadRequestError } = require('../utils/error');
let csv = require('csvtojson');
const { Op } = require('sequelize');

const addTopic = async (data) => {
    result = await db.topics.create({
        VietnameseName: data.VietnameseName,
        EnglishName: data.EnglishName,
    });
    return result ? ({statusCode: 200, message: "Thêm đề tài thành công!"}) :  ({statusCode: 200, message: "Có lỗi xảy ra!"});
}

const uploadFile = async (file) => {
    let result;
    let listTopic = [];

    const topic = await csv().fromFile(file.path);
    for (const element of topic) {
        try {
            // const checkTopic = await db.topics.findOne({ where: { code: element.codeTopic } });
            // if (checkTopic) {
            //     return ({ statusCode: 400, message: 'Mã đề tài không được trùng nhau!' })
            // }
            result = await db.topics.create({
                VietnameseName: element.VietnameseTopicName,
                EnglishName: element.EnglishTopicName,
            });
            listTopic.push(result);
        } catch (err) {
            return err;
        }
    }
    return listTopic ? ({ statusCode: 200, message: 'Cập nhật thành công!' }) : ({statusCode: 400, message: 'Có lỗi xry ra!' });

}

const updateTopic = async (data, id) => {

    const check = await db.topics.findOne({ where: { id: id } });
    if (!check) {
        console.log(check);
        return BadRequestError(400, 'Topic not found!');
    }
    const result = await db.topics.update(data, { where: { id: id } });
    return (result) ? ({statusCode: 200, message: 'Cập nhật thành công!' }) : ({statusCode: 400, message: 'Có lỗi xry ra!' });
}

const getOne = async (id) => {
    const check = await db.topics.findOne({ where: { id: id } });
    if (!check) {
        return BadRequestError(400, 'Topic not found!');
    }
    const result = await db.topics.findOne({
        where: { id: id }
    });
    return result;
}

const getAll = async (page) => {
    const pageSize = 8;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const { count, rows } = await db.topics.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: [['id', 'DESC']],
    });
    const lastPage = Math.ceil(count / pageSize);
    const previousPage = currentPage - 1 > 0 ? currentPage - 1 : null;
    const nextPage = currentPage + 1 <= lastPage ? currentPage + 1 : null;
    return rows.length ? {
        currentPage: currentPage,
        previousPage, nextPage, lastPage,
        total: count,
        data: rows
    } : BadRequestError(400, 'Đề tài rỗng!');
}

const deleteTopic = async (id) => {
    const check = await db.topics.findOne({ where: { id: id } });
    if (!check)
        return BadRequestError(400, 'Topic not found!');
    const result = await db.topics.destroy({ where: { id: id } });
    return (result) ? ({statusCode: 200, message: 'Xóa thành công!' }) : ({statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const search = async (value, page) => {
    const pageSize = 8;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const {count, rows} = await db.topics.findAndCountAll({
        where: {
            [Op.or]: {
                code: { [Op.like]: `%${value}%` },
                VietnameseName: { [Op.like]: `%${value}%` },
                EnglishName: { [Op.like]: `%${value}%` },
            }
        },
        limit: pageSize,
        offset: offset
    });
    const lastPage = Math.ceil(count / pageSize);
    const previousPage = currentPage - 1 > 0 ? currentPage - 1 : null;
    const nextPage = currentPage + 1 <= lastPage ? currentPage + 1 : null;
    return rows.length ? {
        statusCode: 200,
        currentPage: currentPage,
        previousPage, nextPage, lastPage,
        total: count,
        data: rows
    } : BadRequestError(400, 'error!');
}

const getListTopic = async () => {
    const result = await db.topics.findAll({
        order: [['id', 'DESC']],
    });
    return result;
}

module.exports = {
    addTopic,
    updateTopic,
    getOne,
    getAll,
    deleteTopic,
    uploadFile,
    search,
    getListTopic
}