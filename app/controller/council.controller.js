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
        const result = await councilService.updateCouncil(req.body, req.params.id);
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
        const result = await councilService.getAll();
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
    getAll
}