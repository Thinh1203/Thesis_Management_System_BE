const gradeService = require('../services/gradei.service');

const create = async (req, res) => {
    try {
        const result = await gradeService.create(req.user, req.file);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateOne = async (req, res) => {
    try {
        const result = await gradeService.updateOne(req.body, req.params.id);    
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await gradeService.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {

        const result = await gradeService.getAll(req.user);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteOne = async (req, res) => {
    try {
        const result = await gradeService.deletegrade(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne
}