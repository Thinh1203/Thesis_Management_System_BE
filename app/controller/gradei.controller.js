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
        const result = await gradeService.getOne(req.user.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {

        const result = await gradeService.getAll();
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

const downLoadFile = async (req, res) => {
    try {
        const result = await gradeService.downLoadFile(req.params.id);
        if (result.statusCode === 400) {
            return res.status(400).json({ message: result.message });
        }
        return res.download(result.file);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const fileName = async (req, res) => {
    try {
        const result = await gradeService.fileName(req.params.id);
        if (result.statusCode === 400) {
            return res.status(400).json({ message: result.message });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    downLoadFile,
    fileName
}