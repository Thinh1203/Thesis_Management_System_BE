const db = require('../config/database.config');
const { BadRequestError } = require('../utils/error');
const { sendMail } = require('../middleware/sendmail');
const { Op } = require('sequelize');
const createCouncil = async (data) => {
    const result = await db.councils.create({
        code: data.code,
        timeStart: data.timeStart,
        timeEnd: data.timeEnd,
        startDate: data.startDate,
        shoolYearId: data.shoolYearId
    });
    let councilUser = [];

    let html = `<p>Địa điểm diễn ra: <b>${result.code}</b>. Thời gian hội đồng diễn ra từ <b>${result.timeStart}</b> đến <b>${result.timeEnd}</b> ngày <b>${new Date(result.startDate).toLocaleDateString('en-GB')}</b></p>
                <h3>Danh sách thành viên hội đồng:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Vị trí</th>
                            <th>Tên</th>
                        </tr>
                    </thead>
                    <tbody>`;
                 
    for (let i = 0; i < data.user.length; i++) {
        const council = await db.councilDetails.create({
            position: data.user[i].position,
            teacherId: data.user[i].userId,
            councilId: result.id
        });
        const findUser = await db.teachers.findOne({ where: { id: council.teacherId } });
        councilUser.push(council);
        html += `
            <tr>
                <td>${data.user[i].position}</td>
                <td>${findUser.fullName}</td>
            </tr>
        `;
    }
    html += `
                    </tbody>
                </table>
            `;
    for (let i = 0; i < data.user.length; i++) {
        const findUser = await db.teachers.findOne({ where: { id: data.user[i].userId } });
        const subject = `Bạn đã được thêm vào hội đồng HD${result.id} `;
        const emailHtml = `<p>Xin chào ${findUser.fullName},</p>
                            <p>Bạn đã được thêm vào hội đồng HD${result.id}. Danh sách thành viên hội đồng và vị trí của họ được liệt kê dưới đây:</p>
                            ${html}
                        `;
        sendMail(findUser.email, subject, emailHtml);
    }
    return result ? ({ statusCode: 200, message: "Đã tạo hội đồng!", data: result }) : ({ statusCode: 400, message: "Có lỗi xảy ra!" });
}


const updateCouncil = async (id, data) => {
    const council = await db.councils.findOne({ where: { id: id } });
    if (!council) return BadRequestError(400, 'Council not found!');
    let result;

    if (data.code || data.timeStart || data.timeEnd || data.startDate) {
        result = await db.councils.update(data, { where: { id: id } });
        const councilMember = await db.councilDetails.findAll({ where: { councilId: council.id } });

        const councils = await db.councils.findOne({ where: { id: id } });

        for (let i = 0; i < councilMember.length; i++) {
            let findUser = await db.teachers.findByPk(councilMember[i].teacherId);
            const subject = `Cập nhật hội đồng HD${council.id} `;
            const emailHtml = `<p>Địa điểm diễn ra: <b>${councils.code}</b> Thời gian hội đồng diễn ra từ <b>${councils.timeStart.slice(0, -3)}</b> đến <b>${councils.timeEnd.slice(0, -3)}</b> Ngày: <b>${new Date(councils.startDate).toLocaleDateString('en-GB')}</b></p>`;
            sendMail(findUser.email, subject, emailHtml);
        }
        return (result) ? ({ statusCode: 200, message: 'Cập nhật thành công' }) : ({ statuscode: 400, message: 'có lỗi xảy ra!' });
    }
    // result = await db.councils.update(data, {where: {id:id}});
    return (result) ? ({ statusCode: 200, message: 'Cập nhật thành công' }) : ({ statuscode: 400, message: 'có lỗi xảy ra!' });
}

const getOne = async (id) => {
    const check = await db.councils.findOne({ where: { id: id } });
    if (!check)
        return BadRequestError(400, 'Council not found!');
    const result = await db.councils.findOne({
        attributes: { exclude: ['shoolYearId', 'status'] },
        include: [
            {
                model: db.councilDetails,
                attributes: { exclude: ['id', 'councilId', 'teacherId'] },
                include: [
                    {
                        model: db.teachers,
                        attributes: ['account', 'fullName']
                    }
                ]
            },
            {
                model: db.schoolYears,
                attributes: { exclude: ['id'] },
            },
            {
                model: db.theses,
                attributes: ['endDate'],
                include: [
                    {
                        model: db.topics
                    },
                    {
                        model: db.students,
                        attributes: ['fullName']
                    },
                    {
                        model: db.teachers,
                        attributes: ['fullName']
                    },
                ]
            }
        ],
        where: { id: id }
    });
    return result ? ({ statusCode: 200, data: result }) : ({ statusCode: 400, message: 'Không tìm thấy!' });
}


const getOneUpdate = async (id) => {
    const check = await db.councils.findOne({ where: { id: id } });
    if (!check)
        return BadRequestError(400, 'Council not found!');
    const result = await db.councils.findOne({
        attributes: { exclude: ['shoolYearId'] },
        where: { id: id }
    });

    const data = {
        id: result.id,
        code: result.code,
        status: result.status,
        timeStart: result.timeStart.slice(0, -3),
        timeEnd: result.timeEnd.slice(0, -3),
        startDate: result.startDate.toISOString().slice(0, 10)
    }

    return data;
}

const getAll = async (page) => {
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const { rows, count } = await db.councils.findAndCountAll({
        attributes: { exclude: ['shoolYearId'] },
        include: [
            {
                model: db.schoolYears,
                attributes: { exclude: ['id'] },
            }
        ],
        order: [['id', 'DESC']],
        limit: pageSize,
        offset: offset
    });
    const lastPage = Math.ceil(count / pageSize);
    const previousPage = currentPage - 1 > 0 ? currentPage - 1 : null;
    const nextPage = currentPage + 1 <= lastPage ? currentPage + 1 : null;
    return rows.length ? {
        currentPage: currentPage,
        previousPage, nextPage, lastPage,
        total: count,
        data: rows
    } : BadRequestError(400, 'Council not found!');
}


const deleteOne = async (id) => {
    const check = await db.councils.findOne({ where: { id: id } });
    if (!check) {
        return BadRequestError(400, 'Council không tồn tại!');
    }
    const councilMember = await db.councilDetails.findAll({ where: { councilId: id } });
    for (let i = 0; i < councilMember.length; i++) {
        let idMember = councilMember[i].id;
        await db.councilDetails.destroy({ where: { id: idMember } });
    }
    const result = await db.councils.destroy({ where: { id: id } });

    return (result) ? ({ statusCode: 200, message: 'Xóa thành công!' }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const getAllSemester = async () => {
    const results = await db.schoolYears.findAll({
        order: [['id', 'DESC']],
    });
    return (results) ? ({ statusCode: 200, message: 'Successfully', data: results }) : ({ statusCode: 400, message: 'error' });
}

const getAllTeacher = async () => {
    const results = await db.teachers.findAll(
        {
            attributes: { exclude: ['password'] },
            where: {
                roleId: {
                    [Op.notIn]: [1]
                }
            }
        }
    );
    return (results) ? ({ statusCode: 200, message: 'Successfully', data: results }) : ({ statusCode: 400, message: 'error' });
}


const councilStatus = async (id, data) => {
    const results = await db.councils.update(data, { where: { id: id } });
    return (results) ? ({ statusCode: 200, message: 'Successfully' }) : ({ statusCode: 400, message: 'error' });
}


const getListCouncil = async () => {
    const result = await db.councils.findAll({
        order: [['id', 'DESC']],
    });
    return result;
}

const getOneCouncilDetail = async (id, userId) => {
    const result = await db.theses.findAll({
        attributes: ['id', 'reportFile', 'score'],
        include: [
            {
                model: db.topics
            },
            {
                model: db.councils,
                attributes: ['code', 'id'],
                where: { id: id },
            },
            {
                model: db.students,
                attributes: ['fullName'],
            },
        ]
    });
    return result ? ({ statusCode: 200, data: result }) : ({ statusCode: 400, message: 'Không tìm thấy!' });
}

const scoreDetail = async (id, userId) => {

    const result = await db.transcripts.findOne({
        attributes: ['score'],
        where: {
            [Op.and]: {
                teacherId: userId,
                thesisId: id
            }
        }
    });
    return result ? ({ statusCode: 200, data: result }) : ({ statusCode: 400, message: 'Không tìm thấy!' });
}

const getTotalCouncil = async () => {
    const { count, rows } = await db.councils.findAndCountAll({

        where: {
            status: true
        }
    });
    return rows.length ? {
        total: count,
        data: rows
    } : BadRequestError(400, 'Council not found!');
}


module.exports = {
    createCouncil,
    updateCouncil,
    getOne,
    getAll,
    deleteOne,
    getAllSemester,
    getAllTeacher,
    councilStatus,
    getOneUpdate,
    getListCouncil,
    getOneCouncilDetail,
    scoreDetail,
    getTotalCouncil
}