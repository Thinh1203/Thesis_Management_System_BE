const departmentServices = require('../services/department.service');

const add = async (req, res) => {
    const result = await departmentServices.create(req.body);
    return res.json(result);         
}

const update = async (req, res) => {
    const id = req.params.id;
    const result = await departmentServices.update(id, req.body);
    return res.json(result);
}

const getAll = async (req, res) => {
    const result = await departmentServices.getAll();
    return res.json(result);
} 

const getOne = async (req, res) => {
    const id = req.params.id;
    const result = await departmentServices.getOne(id);
    return res.json(result);
}

const deleteOne = async (req, res) => {
    const id = req.params.id;
    const result = await departmentServices.deleteOne(id);
    return res.json(result);
}

module.exports = {
    add,
    update,
    getAll,
    getOne,
    deleteOne
}