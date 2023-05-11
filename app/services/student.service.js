const db = require('../config/database.config');
const { BadRequestError } = require('../utils/error');
const bcrypt = require('bcryptjs');
const validation = require('../utils/validation');
let csv = require('csvtojson');
const { sendMail } = require('../middleware/sendmail');
const { generatePassword } = require('../utils/randomPassword');
const { Op, where } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const addStudent = async (data) => {
    const role = 4;
    const user = await db.students.findOne({ where: { account: data.account } });
    if (user) {
        return BadRequestError(400, 'Tài khoản đã tồn tại!');
    }
    if (!validation.checkPhoneNumber(data.numberPhone)) {
        return BadRequestError(400, 'Số điện thoại không hợp lệ');
    }
    if (!validation.checkEmail(data.email)) {
        return BadRequestError(400, 'Email không hợp lệ!');
    }

    let randomPassword = generatePassword();
    const hashPassword = await bcrypt.hash(randomPassword, 8);
    const result = await db.students.create({
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

    const role = 4;
    const userData = [];
    const results = await csv().fromFile(file.path);
    for (const element of results) {
        try {
            const checkUser = await db.students.findOne({ where: { account: element.Code } });
            if (checkUser) {
                return ({ statusCode: 400, message: 'Tài khoản đã tồn tại!' })
            }
            let randomPassword = generatePassword();
            const hashPassword = await bcrypt.hash(randomPassword, 8);
            const user = await db.students.create({
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
    return userData ? ({ statusCode: 200, message: 'Cập nhật thành công!' }) : ({ message: 'error' });
}

const updateStudent = async (data, id) => {
    const user = await db.students.findByPk(id);
    if (!user) return BadRequestError(400, 'user not found!');

    if (data.phone) {
        if (!validation.checkPhoneNumber(data.phone)) {
            return BadRequestError(400, 'Phone number is not valid');
        }
    }

    if (data.email) {
        if (!validation.checkEmail(data.email)) {
            return BadRequestError(400, 'Email is not valid!');
        }
    }

    const result = await db.students.update(data, { where: { id: id } });
    return (result[0]) ? ({ statusCode: 200, message: 'Cập nhật thành công!' }) : ({ message: 'error' });

}

const getAll = async (page) => {
    const pageSize = 8;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const { count, rows } = await db.students.findAndCountAll({
        attributes: { exclude: ['roleId', 'password'] },
        include: [
            {
                model: db.roles,
                attributes: { exclude: ['id'] },
            }
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
    } : BadRequestError(400, 'User not found!');
}

const getOne = async (id) => {
    const user = await db.students.findOne(
        {
            attributes: { exclude: ['roleId', 'gradeiId', 'password'] },
            include: [
                {
                    model: db.roles,
                    attributes: { exclude: ['id'] }
                }
            ],
            where: { id: id }
        }
    )
    if (!user) return BadRequestError(400, 'user not found!');
    return user;
}

const deleteStudent = async (id) => {
    const user = await db.students.findByPk(id);
    if (!user) return BadRequestError(400, 'user not found!');
    const result = await db.students.destroy({ where: { id: id } });

    return (result) ? ({ statusCode: 200, message: 'Successfully' }) : ({ message: 'Có lỗi xảy ra!' });
}

const updatePassword = async (id, data) => {

    const user = await db.students.findOne({ where: { id: id } });
    if (!bcrypt.compareSync(data.oldPassword, user.password))
        return BadRequestError(403, 'Mật khẩu cũ không đúng!');

    if (data.newPassword != data.confirmPassword)
        return BadRequestError(403, 'Mật khẩu mới không trùng khớp!');

    const newPass = await bcrypt.hash(data.newPassword, 8);

    const result = await db.students.update({ password: newPass }, { where: { id: id } });
    return (result) ? ({ statusCode: 200, massage: 'Cập nhật thành công!' }) : ({ message: 'Có lỗi xảy ra!' });
}

const accountStatus = async (status, id) => {
    const user = await db.students.findByPk(id);
    if (!user) return BadRequestError(400, 'user not found!');
    const result = await db.students.update({ status: status }, { where: { id: id } });
    return (result[0]) ? ({ status: 200, message: 'Successfully' }) : ({ message: 'Có lỗi xảy ra!' });
}

const search = async (value, page) => {
    const pageSize = 8;
    const offset = (page - 1) * pageSize;
    const currentPage = parseInt(page);
    const {count, rows} = await db.students.findAndCountAll({
        attributes: { exclude: ['roleId', 'password'] },
        where: {
            [Op.or]: {
                account: { [Op.like]: `%${value}%` },
                fullName: { [Op.like]: `%${value}%` },
                address: { [Op.like]: `%${value}%` },
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

const getTotalStudent = async () => {
    const { count, rows } = await db.students.findAndCountAll({
        attributes: { exclude: ['roleId', 'password'] },
        where: {
            status: true
        }
    });
    return rows.length ? {
        total: count,
        data: rows
    } : BadRequestError(400, 'User not found!');
}

const getListStudent = async () => {
    const result = await db.students.findAll({
        attributes: ['id', 'fullName'],
        order: [['id', 'DESC']],
    });
    return result;
}

const getTheses = async (id) => {
    const result = await db.theses.findOne({
        attributes: ['id','endDate', 'statusFile', 'score'],
        where: {
            studentId: id
        },
        include: [
            {
                model: db.topics,
            }, {
                model: db.councils,
                attributes: ['id','code']
            }
        ]
    });
    return result;
}

const getThesesDetail = async (id) => {
    const result = await db.theses.findOne({
        attributes: { exclude: ['topicId','teacherId', 'councilId', 'studentId', 'shoolYearId']},
        where: {
            id: id
        },
        include: [
            {
                model: db.topics,
         
            }, {
                model: db.councils,
                attributes: ['code']
            }, {
                model: db.teachers,
                attributes: ['fullName']
            },{
                model: db.students,
                attributes: ['fullName']
            },{
                model: db.schoolYears,
            },
        ]
    });
    return result;
}

const getListStudentGrade = async () => {
    const result = await db.students.findAll({
        attributes: ['id', 'account', 'fullName', 'email'],
        include: [
            {
                model: db.gradeIs,
                where: { status: 'yes' }
            },
            {
                model: db.theses,
                attributes: ['id'],
                include: [
                    {
                        model: db.topics
                    },
                    {
                        model: db.schoolYears,
                   
                    }
                ]
            }
        ]
    });

    return result;
}

module.exports = {
    addStudent,
    updateStudent,
    getOne,
    getAll,
    deleteStudent,
    updatePassword,
    accountStatus,
    uploadFile,
    search,
    getTotalStudent,
    getListStudent,
    getTheses,
    getThesesDetail,
    getListStudentGrade
}