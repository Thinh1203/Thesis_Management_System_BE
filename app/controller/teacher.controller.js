const teacherService = require('../services/teacher.service');

const addTeacher = async (req, res) => {
    try {
    
        const result = await teacherService.addTeacher(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const uploadFile = async (req, res) => {
    try {

        const result = await teacherService.uploadFile(req.file);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const updateTeacher = async (req, res) => {
    try {
        const result = await teacherService.updateTeacher(req.body, req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const accountStatus = async (req, res) => {
    try {
        const result = await teacherService.accountStatus(req.body.data, req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


const getOne = async (req, res) => {
    try {
        const result = await teacherService.getOne(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const { page } = req.query;
        const result = await teacherService.getAll(req.user, page);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const search = async (req, res) => {
    try {
        const value = req.query.q;
        const result = await teacherService.search(value);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const result = await teacherService.deleteTeacher(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const updatePassword = async (req, res) => {
    try {
        const result = await teacherService.updatePassword(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


const getTotalTeacher = async (req, res) => {
    try {
        const result = await teacherService.getTotalTeacher();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getListTeacher = async (req, res) => {
    try {
        const result = await teacherService.getListTeacher();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getAllCouncil = async (req, res) => {
    try {
        const result = await teacherService.getAllCouncil(req.user.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getAllTopicTutorial= async (req, res) => {
    try {

        const result = await teacherService.getAllTopicTutorial(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
module.exports = {
    addTeacher,
    getAll,
    getOne,
    updateTeacher,
    deleteTeacher,
    updatePassword, 
    search,
    accountStatus,
    uploadFile,
    getTotalTeacher,
    getListTeacher,
    getAllCouncil,
    getAllTopicTutorial
}