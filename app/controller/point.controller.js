const pointServices = require('../services/pointi.service');

const addApplication = async (req, res) => {
    try {

        const result = await pointServices.addApplication(req.file, req.body, res.locals.user);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const update = async (req, res) => {
    try {
        const result = await pointServices.updateApplication(req.file, req.body, req.params.id);    
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await pointServices.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await pointServices.getAll();
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteOne = async (req, res) => {
    try {
        const result = await pointServices.deleteApplication(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    addApplication,
    getAll,
    getOne,
    update,
    deleteOne
}