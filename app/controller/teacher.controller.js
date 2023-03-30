const teacherService = require('../services/teacher.service');

const addTeacher = async (req, res) => {
    try {
        const result = await teacherService.addTeacher(req.body, req.file);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateTeacher = async (req, res) => {
    try { 
        const result = await teacherService.updateTeacher(req.body,req.params.id);    
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await teacherService.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await teacherService.getAll(req.user);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const result = await teacherService.deleteTeacher(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updatePassword = async (req, res) => {
    try {
        const result = await teacherService.updatePassword(req.params.id, req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}


module.exports = {
    addTeacher,
    getAll,
    getOne,
    updateTeacher,
    deleteTeacher,
    updatePassword
}