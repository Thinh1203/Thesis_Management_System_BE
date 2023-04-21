const db = require('../config/database.config');
const { BadRequestError } = require('../utils/error');
const bcrypt = require('bcryptjs');
const validation = require('../utils/validation');
let csv = require('csvtojson');
const { sendMail } = require('../middleware/sendmail');
const { generatePassword } = require('../utils/randomPassword');
const { Op, where } = require('sequelize');


const addTeacher = async (data) => {
    const role = 3;
    const user = await db.teachers.findOne({ where: { account: data.account } });
    if (user) {
        return BadRequestError(400, 'Tài khoản đã tồn tại!');
    }

    if (!validation.checkPhoneNumber(data.numberPhone)) {
        return BadRequestError(400, 'Số điện thoại không hợp lệ!');
    }
    if (!validation.checkEmail(data.email)) {
        return BadRequestError(400, 'Email không hợp lệ!');
    }

    let randomPassword = generatePassword();
    const hashPassword = await bcrypt.hash(randomPassword, 8);
    const result = await db.teachers.create({
        account: data.account,
        password: hashPassword,
        fullName: data.fullName,
        numberPhone: data.numberPhone,
        email: data.email,
        address: data.address,
        gender: data.gender,
        roleId: role
    });
    const subject = 'Tài khoản đăng nhập hệ thống!';
    const html = `<p>Account: ${result.account} </p> </br> <p> Password: ${randomPassword} </p>`;
    sendMail(result.email, subject, html);

    return result ? ({ statusCode: 200, message: 'Cập nhật thành công!' }) : ({ message: 'error' });
}


const uploadFile = async (file) => {
    const role = 3;
    const userData = [];
    const results = await csv().fromFile(file.path);
    for (const element of results) {
        try {
            const checkUser = await db.teachers.findOne({ where: { account: element.Code } });
            if (checkUser) {
                return ({ statusCode: 400, message: 'Tài khoản đã tồn tại!' })
            }
            let randomPassword = generatePassword();
            const hashPassword = await bcrypt.hash(randomPassword, 8);
            const user = await db.teachers.create({
                account: element.Code,
                password: hashPassword,
                fullName: element.Name,
                email: element.Email,
                address: element.Address,
                numberPhone: element.Phone,
                gender: element.Gender,
                roleId: role
            });
            userData.push(user);
            const subject = 'Tài khoản đăng nhập hệ thống!';
            const html = `<p>Account: ${user.account} </p> </br> <p> Password: ${randomPassword} </p>`;
            sendMail(user.email, subject, html);
        } catch (error) {
            return error;
        }
    }
    return userData ? ({ statusCode: 200, message: 'Cập nhật thành công!' }) : ({ statusCode: 400, message: 'Có lỗi xảy ra!' });
}

const accountStatus = async (status, id) => {

    const user = await db.teachers.findByPk(id);
    if (!user) return BadRequestError(400, 'user not found!');
    const result = await db.teachers.update({ status: status }, { where: { id: id } });
    return (result[0]) ? ({ status: 200, message: 'Successfully' }) : ({ message: 'error' });
}

const updateTeacher = async (data, id) => {
    const user = await db.teachers.findByPk(id);
    if (!user) return BadRequestError(400, 'Tài khoản không tồn tại!');

    if (data.phone) {
        if (!validation.checkPhoneNumber(data.phone)) {
            return BadRequestError(400, 'Số điện thoại không hợp lệ');
        }
    }

    if (data.email) {
        if (!validation.checkEmail(data.email)) {
            return BadRequestError(400, 'Email không hợp lệ!');
        }
    }

    const result = await db.teachers.update(data, { where: { id: id } });
    return (result[0]) ? ({ statusCode: 200, message: 'Cập nhật thành công!' }) : ({ message: 'error' });

}

const getAll = async (user, page) => {
    const pageSize = 8;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    if (user.role == 'admin') {
        const { count, rows } = await db.teachers.findAndCountAll({
            attributes: { exclude: ['roleId', 'password'] },
            include: [
                {
                    model: db.roles,
                    attributes: { exclude: ['id'] },
                    where: { code: { [Op.notIn]: ['admin'] } }
                }
            ],
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
        } : BadRequestError(400, 'User not found!');
    }
    const { count, rows } = await db.teachers.findAndCountAll({
        attributes: { exclude: ['roleId', 'password'] },
        include: [
            {
                model: db.roles,
                attributes: { exclude: ['id'] },
                where: { code: { [Op.ne]: 'admin' } }
            }
        ],
        where: { id: { [Op.ne]: user.id } },
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
    } : BadRequestError(400, 'User not found!');
}


const search = async (value) => {
    const results = await db.teachers.findAll({
        attributes: { exclude: ['roleId', 'password'] },
        include: [
            {
                model: db.roles,
                attributes: { exclude: ['id'] },
            }
        ],
        where: {
            [Op.or]: {
                account: { [Op.like]: `%${value}%` },
                fullName: { [Op.like]: `%${value}%` },
                address: { [Op.like]: `%${value}%` },
            },
            roleId: {
                [Op.notIn]: [1, 2]
            }
        },
    });
    return results;
}

const getOne = async (id) => {

    const user = await db.teachers.findOne(
        {
            attributes: { exclude: ['roleId', 'password'] },
            include: [
                {
                    model: db.roles,
                }
            ],
            where: { id: id }
        }
    );
    if (!user) return BadRequestError(400, 'user not found!');

    return user;
}

const deleteTeacher = async (id) => {
    const user = await db.teachers.findByPk(id);
    if (!user) return BadRequestError(400, 'user not found!');
    const result = await db.teachers.destroy({ where: { id: id } });

    return (result) ? ({ statusCode: 200, message: 'Successfully' }) : ({ message: 'error' });
}

const updatePassword = async (id, data) => {
    const user = await db.teachers.findOne({ where: { id: id } });
    if (!bcrypt.compareSync(data.oldPassword, user.password))
        return BadRequestError(400, 'Mật khẩu cũ không đúng!');

    if (data.newPassword != data.confirmPassword)
        return BadRequestError(400, 'Mật khẩu mới không trùng khớp!');

    const newPass = await bcrypt.hash(data.newPassword, 8);

    const result = await db.teachers.update({ password: newPass }, { where: { id: id } });
    return (result) ? ({ statusCode: 200, message: 'Đổi mật khẩu thành công!' }) : ({ message: 'error' });
}

const getTotalTeacher = async () => {
    const { count, rows } = await db.teachers.findAndCountAll({
        attributes: { exclude: ['roleId', 'password'] },
        include: [
            {
                model: db.roles,
                attributes: { exclude: ['id'] },
                where: { code: { [Op.ne]: 'admin' } }
            }
        ],
    });
    return rows.length ? {
        total: count,
        data: rows
    } : BadRequestError(400, 'User not found!');
}


const getListTeacher = async () => {
    const result = await db.teachers.findAll({
        attributes: ['id', 'fullName'],
        include: [
            {
                model: db.roles,
                attributes: { exclude: ['id'] },
                where: { code: { [Op.ne]: 'admin' } }
            }
        ],
        order: [['id', 'DESC']],
    });
    return result;
}

const getAllCouncil = async (id) => {
    const kq1 = await db.councils.findAll({
        include: [
            {
                model: db.theses,
                // include: [
                //     {
                //         model: db.councils,

                //     }
                // ],
                where: { teacherId: id }
            }
        ],
    });
    const newKq1 = kq1.map(e => {
        return {
            "id": e.id,
            "code": e.code,
            "status": e.status,
            "timeStart": e.timeStart,
            "timeEnd": e.timeEnd,
            "startDate": e.startDate,
            "shoolYearId": e.shoolYearId,
            "position":  'gvhd'
        }
    });
    const kq2 = await db.councils.findAll({
        include: [
            {
                model: db.councilDetails,
                where: { teacherId: id }
            }
        ]
    });
    const newKq2 = kq2.map(e => {
        return {
            "id": e.id,
            "code": e.code,
            "status": e.status,
            "timeStart": e.timeStart,
            "timeEnd": e.timeEnd,
            "startDate": e.startDate,
            "shoolYearId": e.shoolYearId,
            "position":  e.councildetails[0].position
        }
    });
    const kq = newKq1.concat(newKq2);

    return kq
    return kq1 ? { statusCode: 200, data1: kq1, data2: kq2 } : { statusCode: 400, message: "Không tìm thấy!" };
};


module.exports = {
    addTeacher,
    updateTeacher,
    getOne,
    getAll,
    deleteTeacher,
    updatePassword,
    search,
    accountStatus,
    uploadFile,
    getTotalTeacher,
    getListTeacher,
    getAllCouncil,
}