import userService from '../services/userService.js';

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.createUser(userData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUserToken = async (req, res) => {
    try {
        const { userId, tokenData } = req.body;
        const result = await userService.createUserToken(userId, tokenData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getUserTokensByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const tokens = await userService.getUserTokensByUserId(userId);
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const result = await userService.updateUser(userId, updatedData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userService.deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createUser,
    createUserToken,
    getUserById,
    getUserTokensByUserId,
    updateUser,
    deleteUser
};
