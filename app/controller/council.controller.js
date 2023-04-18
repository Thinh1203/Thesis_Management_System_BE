const { schoolYears } = require('../config/database.config');
const councilService = require('../services/council.service');

const createCouncil = async (req, res) => {
    try {
        const result = await councilService.createCouncil(req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateCouncil = async (req, res) => {
    try {
        const result = await councilService.updateCouncil(req.params.id, req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteOne = async (req, res) => {
    try {
        const result = await councilService.deleteOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await councilService.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const { page } = req.query;
        const result = await councilService.getAll(page);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAllSemester = async (req, res) => {
    try {
        const result = await councilService.getAllSemester();
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAllTeacher = async (req, res) => {
    try {
        const result = await councilService.getAllTeacher();
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const councilStatus = async (req, res) => {
    try {
        const result = await councilService.councilStatus(req.params.id, req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOneUpdate = async (req, res) => {
    try {
        const result = await councilService.getOneUpdate(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    createCouncil,
    updateCouncil,
    deleteOne,
    getOne,
    getAll,
    getAllSemester,
    getAllTeacher,
    councilStatus,
    getOneUpdate
}