const db = require('../config/database.config');
const { BadRequestError } = require('../utils/error');
const { sendMail } = require('../middleware/sendmail');

const addTheses = async (data) => {
    if (!data.endDate || !data.schoolYearId || !data.councilId || !data.topicId || !data.studentId || !data.lecturerId) {
        return BadRequestError(400, 'Data is not empty!');
    }
    const student = await db.students.findOne({ where: { id: data.studentId } });
    const result = await db.theses.create({
        endDate: data.endDate,
        topicId: data.topicId,
        shoolYearId: data.schoolYearId,
        councilId: data.councilId,
        studentId: data.studentId,
        teacherId: data.lecturerId
    });
    const lecturer = await db.teachers.findOne({ where: { id: result.teacherId } });
    const council = await db.councils.findOne({
        include: [
            {
                model: db.councilDetails,
                attributes: { exclude: ['id', 'councilId'] }
            }, {
                model: db.schoolYears,
                attributes: { exclude: ['id'] },
            }
        ], where: { id: result.councilId }
    });

    const subject = `Bạn đã được thêm vào hội đồng ${council.code}`;
    let html = `<p>Thời gian hội đồng diễn ra từ <b>${council.timeStart.slice(0, -3)}</b> đến <b>${council.timeEnd.slice(0, -3)}</b> <b>${new Date(council.startDate).toLocaleDateString('en-GB')}</b></p>
    <h3>Danh sách thành viên hội đồng:</h3>
    <table>
        <thead>
            <tr>
                <th>Vị trí</th>
                <th>Tên</th>
            </tr>
        </thead>
        <tbody>`;
    for (let i = 0; i < council.councildetails.length; i++) {
        const findUser = await db.teachers.findOne({ where: { id: council.councildetails[i].teacherId } });
        html += `
            <tr>
                <td>${council.councildetails[i].position}</td>
                <td>${findUser.fullName}</td>
            </tr>
            `;
    }
    html += `
                    </tbody>
                </table>
            `;

    sendMail(student.email, subject, html);
    sendMail(lecturer.email, subject, html);
    return result ? ({ statusCode: 200, message: 'Đã thêm khóa luận!' }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const updateTheses = async (data, id) => {
    const check = await db.theses.findOne({ where: { id: id } });
    if (!check) {

        return BadRequestError(400, 'Theses not found!');
    }
    const result = await db.theses.update(data, { where: { id: id } });
    return (result) ? ({ message: 'Successfully' }) : ({ message: 'error' });
}

const getOne = async (id) => {
    const check = await db.theses.findOne({ where: { id: id } });
    if (!check) {
        return BadRequestError(400, 'Theses not found!');
    }
    const result = await db.theses.findOne({
        attributes: { exclude: ['topicId', 'departmentId', 'shoolYearId', 'councilId', 'studentId', 'lecturerId'] },

        include: [
            {
                model: db.topics,
                attributes: { exclude: ['id', 'departmentId'] }
            },
            {
                model: db.departments,
                attributes: { exclude: ['id'] }
            },
            {
                model: db.schoolYears,
                attributes: { exclude: ['id'] }
            },
            {
                model: db.councils,
                attributes: { exclude: ['id', 'shoolYearId'] }
            },
            {
                model: db.users,
                attributes: { exclude: ['id'] },
            },
        ],
        where: { id: id }
    });
    return result;
}

const getAll = async (page) => {
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const { rows, count } = await db.theses.findAndCountAll({
        attributes: { exclude: ['topicId', 'shoolYearId', 'studentId', 'teacherId', 'councilId'] },
        include: [
            {
                model: db.topics,
                attributes: { exclude: ['id'] }
            },
            {
                model: db.students,
                attributes: ['fullName'],
            },
            {
                model: db.schoolYears,
                attributes: ['year', 'semester']
            },
            {
                model: db.teachers,
                attributes: ['fullName']
            },
            {
                model: db.councils,
                attributes: ['code']
            },
        ],
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
    } : BadRequestError(400, 'Không tồn tại khóa luận nào!');
}

const deleteTheses = async (id) => {
    const check = await db.theses.findOne({ where: { id: id } });
    if (!check)
        return BadRequestError(400, 'Theses not found!');
    const result = await db.theses.destroy({ where: { id: id } });
    return (result) ? ({ message: 'Successfully' }) : ({ message: 'error' });
}

const uploadFile = async (file, id) => {

    const theses = await db.theses.findOne({ where: { id: id } });

    if (!theses) {
        return BadRequestError(400, 'Theses not found!');
    }
    if (!file) {
        return BadRequestError(400, 'File is not empty!');
    }
    const result = await db.theses.update({ reportFile: file.path }, { where: { id: id } });
    return (result) ? ({ message: 'Successfully' }) : ({ message: 'error' });
}

const transcript = async (data, id, user) => {
    const teacherId = await db.teachers.findOne({ where: { id: user.id } });
    const result = await db.transcripts.create({
        score: data.score,
        teacherId: teacherId.id,
        thesesId: id
    });

    const updateScore = await db.transcripts.findOne({ where: { thesesId: id } });
    if (updateScore.length == 3) {
        let totalScore = 0;
        for (let i = 0; i < 3; i++) {
            totalScore += updateScore[i].score;
        }
        sum = totalScore / 3;
        const updateScoreThese = await db.theses.update({ score: sum, where: { id: id } });
    }
    return result;
}

module.exports = {
    addTheses,
    getAll,
    getOne,
    updateTheses,
    deleteTheses,
    uploadFile,
    transcript
}


