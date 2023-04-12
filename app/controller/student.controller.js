const studentService = require('../services/student.service');

const addStudent = async (req, res) => {
    try {
        const result = await studentService.addStudent(req.body, req.file);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateStudent = async (req, res) => {
    try { 
        const result = await studentService.updateStudent(req.body,req.params.id);    
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await studentService.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await studentService.getAll(req.user);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const result = await studentService.deleteStudent(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updatePassword = async (req, res) => {
    try {
        const result = await studentService.updatePassword(req.user.id, req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}


module.exports = {
    addStudent,
    getAll,
    getOne,
    updateStudent,
    deleteStudent,
    updatePassword
}