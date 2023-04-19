const db = require('../config/database.config');
const { BadRequestError } = require('../utils/error');

const addSchoolYear = async (data) => {
    const result = await db.schoolYears.create({
        year: data.year,
        semester: data.semester,
        startDate: data.startDate,
        endDate: data.endDate
    });
    return result ? ({ statusCode: 200, message: 'Đã thêm niên khóa!' }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const updateSchoolYear = async (data, id) => {
    const check = await db.schoolYears.findOne({ where: { id: id } });
    if (!check) {
        return BadRequestError(400, 'Không tìm thấy!');
    }
    const result = await db.schoolYears.update(data, { where: { id: id } });
    return (result[0]) ? ({ statusCode: 200, message: 'Đã cập nhật!' }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const deleteOne = async (id) => {
    const check = await db.schoolYears.findOne({ where: { id: id } });
    if (!check) {
        return BadRequestError(400, 'Không tìm thấy!');
    }
    const result = await db.schoolYears.destroy({ where: { id: id } });
    return (result) ? ({ statusCode: 200, message: 'Đã xóa thành công!' }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const getOne = async (id) => {
    const check = await db.schoolYears.findOne({ where: { id: id } });
    if (!check) {
        return BadRequestError(400, 'Không tìm thấy!');
    }
    const result = await db.schoolYears.findByPk(id);
    const startDate = new Date(result.startDate);
    const endDate = new Date(result.endDate);
    const formattedData = {
        id: result.id,
        year: result.year,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        semester: result.semester
    }
    return result ? ({ statusCode: 200, message: 'Đã tìm thấy!', data: formattedData }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const getAll = async (page) => {
    const pageSize = 4;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const { count, rows } = await db.schoolYears.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: [['id', 'DESC']],
    });

    const lastPage = Math.ceil(count / pageSize);
    const previousPage = currentPage - 1 > 0 ? currentPage - 1 : null;
    const nextPage = currentPage + 1 <= lastPage ? currentPage + 1 : null;

    const formattedData = rows.map(row => {
        const { id, year, semester, startDate, endDate } = row.toJSON();
        return {
            id,
            year,
            semester,
            startDate: new Date(startDate).toLocaleDateString('en-GB'),
            endDate: new Date(endDate).toLocaleDateString('en-GB')
        };
    });

    return rows.length ? {
        statusCode: 200,
        currentPage: currentPage,
        previousPage,
        nextPage,
        lastPage,
        total: count,
        data: formattedData
    } : BadRequestError(400, 'Có lỗi xảy ra!');
}


const getAllSemester = async () => {
    const result = await db.schoolYears.findAll({
        order: [['id', 'DESC']],
    });
    return result;
}

module.exports = {
    addSchoolYear,
    updateSchoolYear,
    deleteOne,
    getOne,
    getAll,
    getAllSemester
}