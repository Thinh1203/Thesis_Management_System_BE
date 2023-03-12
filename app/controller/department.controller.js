const departmentServices = require('../services/department.service');

const addDepartment = async (req, res) => {
    try {
        const result = await departmentServices.addDepartment(req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const result = await departmentServices.updateDepartment(req.body, req.params.id);    
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await departmentServices.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await departmentServices.getAll();
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const result = await departmentServices.deleteDepartment(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    addDepartment,
    getAll,
    getOne,
    updateDepartment,
    deleteDepartment
}