const thesesService = require('../services/theses.service');

const addTheses = async (req, res) => {
    try {
        const result = await thesesService.addTheses(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const updateTheses = async (req, res) => {
    try {
        const result = await thesesService.updateTheses(req.body, req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await thesesService.getOne(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const { page } = req.query;
        const result = await thesesService.getAll(page);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const getAllListTheses = async (req, res) => {
    try {
        const { page } = req.query;
        const result = await thesesService.getAllListTheses(page);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const deleteTheses = async (req, res) => {
    try {
        const result = await thesesService.deleteTheses(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const uploadFile = async (req, res) => {
    try {
        const result = await thesesService.uploadFile(req.file, req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const transcript = async (req, res) => {
    try {
        const result = await thesesService.transcript(req.body, req.params.id, req.user);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const search = async (req, res) => {
    try {
        const { q, page } = req.query;
        const result = await thesesService.search(q, page);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const ListOfGuidedTopics = async (req, res) => {
    try {

        const result = await thesesService.ListOfGuidedTopics(req.user.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const downLoadFile = async (req, res) => {
    try {
        const result = await thesesService.downLoadFile(req.params.id);
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
        const result = await thesesService.fileName(req.params.id);
        if (result.statusCode === 400) {
            return res.status(400).json({ message: result.message });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const getAllTopicComplete = async (req, res) => {
    try {

        const result = await thesesService.getAllTopicComplete(req.user.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const listThesesComplete = async (req, res) => {
    try {
        const { page } = req.query;
        const result = await thesesService.listThesesComplete(page);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

const searchThesesComplete = async (req, res) => {
    try {
        const { q, page } = req.query;
        const result = await thesesService.searchThesesComplete(q, page);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
const getTotalTheses = async (req, res) => {
    try {
        const result = await thesesService.getTotalTheses();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    addTheses,
    getAll,
    getOne,
    updateTheses,
    deleteTheses,
    uploadFile,
    transcript,
    search,
    ListOfGuidedTopics,
    getAllListTheses,
    downLoadFile,
    fileName,
    getAllTopicComplete,
    listThesesComplete,
    searchThesesComplete,
    getTotalTheses
}