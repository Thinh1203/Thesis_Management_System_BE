const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');
const bcrypt = require('bcryptjs');
const validation = require('../utils/validation');
let csv = require('csvtojson');
const { sendMail } = require('../middleware/sendmail');
const { generatePassword } = require('../utils/randomPassword');
const dotenv = require('dotenv');
dotenv.config();

const addStudent = async (data, file) => {
    if(file) {
        const userData = [];
        const results = await csv().fromFile(file.path);
        for (const element of results) {
          try {
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
              roleId: data.roleId,
              departmentId: data.departmentId,
            });
            userData.push(user);
            const subject = 'Tài khoản đăng nhập hệ thống!';
            const html = `<p>Account: ${user.account} </p> </br> <p> Password: ${randomPassword} </p>`;
            sendMail(user.email, subject, html);
          } catch (error) {  
                return error;
          }
        }
        return userData;
    }

    const user = await db.students.findOne({ where: { account: data.code }});
    if(user) {
        return BadRequestError(400,'Account already exists!');
    }
    
    if(!validation.checkPhoneNumber(data.numberPhone)) {
        return BadRequestError(400, 'Phone number is not valid');
    }
    if(!validation.checkEmail(data.email)) {
        return BadRequestError(400,'Email is not valid!');
    }

    if(!data.roleId) {
        return BadRequestError(400,'Role is not empty!');
    }

    if(!data.departmentId) {
        return BadRequestError(400,'department is not empty!');
    }
    
    let randomPassword = generatePassword(); 
    const hashPassword = await bcrypt.hash(randomPassword, 8);
    const result = await db.students.create({
        account: data.code,
        password: hashPassword,
        fullName: data.fullName,
        numberPhone: data.numberPhone,
        email: data.email,
        address: data.address,
        gender: data.gender,
        departmentId: data.departmentId,
        roleId: data.roleId
    });
    const subject = 'Tài khoản đăng nhập hệ thống!';
    const html = `<p>Account: ${result.account} </p> </br> <p> Password: ${randomPassword} </p>`;
    sendMail(result.email, subject, html);

    return result;
}

const updateStudent = async (data, id) => {
   const user = await db.students.findByPk(id);
    if(!user) return BadRequestError(400,'user not found!');

    if(data.phone) {
        if(!validation.checkPhoneNumber(data.phone)) {
            return BadRequestError(400, 'Phone number is not valid');
        }
    }

    if(data.email) {
        if(!validation.checkEmail(data.email)) {
            return BadRequestError(400,'Email is not valid!');
        }
    }

    const result = await db.students.update(data, { where: { id:id }});
    return (result[0]) ? ({message: 'Successfully'}) : ({message: 'error'});

}

const getAll = async (userRole) => {
 
    const user = await db.students.findAll({
        attributes: { exclude: ['departmentId', 'roleId', 'gradeiId', 'password']},
        include: [
            {
                model: db.departments,
                attributes: { exclude: ['id']},
            },
            {
                model: db.roles,
                attributes: { exclude: ['id']}
            }
    ],  where: {departmentId: userRole.department}
    });
    return user;
}

const getOne = async (id) => {
    const user = await db.students.findOne(
        {
            attributes: { exclude: ['departmentId', 'roleId', 'gradeiId', 'password']},
            include: [{
                model: db.departments,
                attributes: { exclude: ['id']}
            },
            {
                model: db.roles,
                attributes: { exclude: ['id']}
            }
        ],
            where: {id:id}
        }
    )
    if(!user) return BadRequestError(400,'user not found!');
    return user;
}

const deleteStudent = async (id) => {
    const user = await db.students.findByPk(id);
    if(!user) return BadRequestError(400,'user not found!');
    const result = await db.students.destroy({ where: { id: id }});

    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const updatePassword = async (id, data) => {

   const user = await db.students.findOne({ where: { id: id }});
    if(!bcrypt.compareSync(data.password, user.password))
        return BadRequestError(400,'Password not match!');

    if(data.newPassword != data.confirmPassword)
        return BadRequestError(400,'New password and confirm password not match!');

     const newPass = await bcrypt.hash(data.newPassword, 8); 

    const result = await db.students.update({ password: newPass}, {where: { id: id }});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}


module.exports = {
    addStudent,
    updateStudent,
    getOne,
    getAll,
    deleteStudent,
    updatePassword
}