const topicService = require('../services/topic.service');

const addTopic = async (req, res) => {
    try {
        const result = await topicService.addTopic(req.body, req.file);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const updateTopic = async (req, res) => {
    try {
        const result = await topicService.updateTopic(req.body, req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const deleteTopic = async (req, res) => {
    try {
        const result = await topicService.deleteTopic(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getOne = async (req, res) => {
    try {
        const result = await topicService.getOne(req.params.id);
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await topicService.getAll();
        return res.json(result);
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    addTopic,
    updateTopic,
    deleteTopic,
    getOne,
    getAll
}