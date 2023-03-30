const db = require('../config/database.config');
const {BadRequestError} = require('../utils/error');
const { sendMail } = require('../middleware/sendmail');
const { moment } = require('moment');
const createCouncil = async (data) => {  
    const result = await db.councils.create({
        code: data.code,
        timeStart: data.timeStart,
        timeEnd: data.timeEnd,
        startDate: data.startDate,
        shoolYearId: data.shoolYearId
    }); 
    let councilUser = [];

    let html = `<p>Thời gian hội đồng diễn ra từ <b>${data.timeStart}</b> đến <b>${data.timeEnd}</b> ngày <b>${data.startDate}</b></p>
                <h3>Danh sách thành viên hội đồng:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Vị trí</th>
                            <th>Tên</th>
                        </tr>
                    </thead>
                    <tbody>`;
    for(let i = 0; i < data.user.length; i++) {
        const council = await db.councilDetails.create({
            position: data.user[i].position,
            teacherId: data.user[i].userId,
            councilId: result.id 
        });  
        const findUser = await db.teachers.findOne({ where: { id: council.teacherId }});
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
    for(let i = 0; i < data.user.length; i++) {
        const findUser = await db.teachers.findOne({ where: { id: data.user[i].userId }});
        const subject = `Bạn đã được thêm vào hội đồng ${data.code} `;
        const emailHtml = `<p>Xin chào ${findUser.fullName},</p>
                            <p>Bạn đã được thêm vào hội đồng ${data.code}. Danh sách thành viên hội đồng và vị trí của họ được liệt kê dưới đây:</p>
                            ${html}
                        `;
        sendMail(findUser.email, subject, emailHtml);
    }
    return result;
}



const updateCouncil = async (data, id) => {
    const council = await db.councils.findOne( {where: { id:id }});
    if(!council) return BadRequestError(400, 'Council not found!'); 
    let result;
    if(data.timeStart || data.timeEnd || data.startDate) {
        result = await db.councils.update(data, {where: {id:id}});
        const councilMember = await db.councilDetails.findAll({ where: { councilId: council.id }});
        const councils = await db.councils.findOne( {where: { id:id }});
        for(let i = 0; i < councilMember.length; i++) {
            let findUser = await db.teachers.findOne({ where: { id: councilMember[i].userId }});
            const subject = `Cập nhật thời gian hội đồng ${council.code} `;
            const emailHtml = `<p>Thời gian hội đồng diễn ra từ <b>${councils.timeStart}</b> đến <b>${councils.timeEnd}</b> <b>${councils.startDate}</b></p>`;
            sendMail(findUser.email, subject, emailHtml);
        }
        return result;
    }
    result = await db.councils.update(data, {where: {id:id}});
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}

const getOne = async (id) => {
    const check = await db.councils.findOne( { where: { id: id }});
    if(!check) 
        return BadRequestError(400, 'Council not found!');
    const result = await db.councils.findOne({        
        attributes: { exclude: ['shoolYearId']}, 
        include: [
            {
                model: db.councilDetails,
                attributes: { exclude: ['id','councilId']}
            }, {
                model: db.schoolYears,
                attributes: { exclude: ['id']},
            }
        ],
        where: {id:id}
    });
    return result;
}

const getAll = async () => {
    const result = await db.councils.findAll({
        attributes: { exclude: ['shoolYearId']}, 
        include: [
            {
                model: db.councilDetails,
                attributes: { exclude: ['id','councilId']}
            }, {
                model: db.schoolYears,
                attributes: { exclude: ['id']},
            }
           
        ]
    });
    return result;
}


const deleteOne = async (id) => {
    const check = await db.councils.findOne({ where: { id: id }});
    if(!check){
        return BadRequestError(400, 'Council not found!');
    }
    const councilMember = await db.councilDetails.findAll({ where: {councilId:id }});
    for(let i = 0; i < councilMember.length; i++){
        let idMember = councilMember[i].id;
        await db.councilDetails.destroy({ where: { id:idMember }});
    }
    const result = await db.councils.destroy({ where: { id: id }}); 
    
    return (result) ? ({message: 'Successfully'}) : ({message: 'error'});
}


module.exports = {
    createCouncil,
    updateCouncil,
    getOne, 
    getAll,
    deleteOne
}