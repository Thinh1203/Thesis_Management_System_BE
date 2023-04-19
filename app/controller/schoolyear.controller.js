const schoolYearService = require('../services/schoolyear.service');


const addSchoolYear = async (req, res) => {
    try {
        const result = await schoolYearService.addSchoolYear(req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateSchoolYear = async (req, res) => {
    try {
        const result = await schoolYearService.updateSchoolYear(req.body, req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteOne = async (req, res) => {
    try {
        const result = await schoolYearService.deleteOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await schoolYearService.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await schoolYearService.getAll(req.query.page);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAllSemester = async (req, res) => {
    try {
        const result = await schoolYearService.getAllSemester();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    addSchoolYear,
    updateSchoolYear,
    deleteOne,
    getOne,
    getAll,
    getAllSemester
}