const departmentServices = require('../services/department.service');

const add = async (req, res) => {
    try {
        const result = await departmentServices.create(req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({message: error });
    }      
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await departmentServices.update(id, req.body);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({message: error });
    }

}

const getAll = async (req, res) => {
    try {
        const result = await departmentServices.getAll();
        return res.json(result);
    } catch(error) {
        return res.status(500).json({message: error });
    }
} 

const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await departmentServices.getOne(id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({message: error });
    }
}

const deleteOne = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await departmentServices.deleteOne(id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({message: error });
    }
}

module.exports = {
    add,
    update,
    getAll,
    getOne,
    deleteOne
}