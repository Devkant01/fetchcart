const { v4: uuidv4 } = require('uuid');
const Api = require('../../models/api.js');

async function getApiKeys(req, res) {
    try {
        const apiKeyDoc = await Api.findOne({ userId: req.user.objectId });

        if (!apiKeyDoc) {
            return res.status(200).json({ message: 'No API keys found for this user', apiKeys: [] });
        }

        res.status(200).json({
            message: 'API keys fetched successfully',
            key: apiKeyDoc.apiKey,
            lastUsed: apiKeyDoc.updatedAt || apiKeyDoc.lastUsed || null,
            status: apiKeyDoc.status || 'active',
            createdAt: apiKeyDoc.createdAt || null,
        });
    } catch (err) {
        console.log("Alert! controller/apiController~getApiKeys just knocked");
        res.status(500).json({ message: 'Failed to fetch API keys from the database' });
    }
}


async function generateNewApiKey(req, res) {
    try {
        const apiKey = `api-key-${uuidv4()}`;

        // Remove any existing API keys for this user before creating a new one
        const existingKeys = await Api.find({ userId: req.user.objectId });
        if (existingKeys && existingKeys.length > 0) {
            await Api.deleteMany({ userId: req.user.objectId });
        }

        const newApiKey = new Api({
            keyName: req.body.keyName || `${req.user.name}-key`,
            apiKey: apiKey,
            userId: req.user.objectId,
        });

        await newApiKey.save();

        res.status(200).json({
            message: 'API key generated successfully',
            key: newApiKey.apiKey,
            lastUsed: newApiKey.updatedAt || newApiKey.lastUsed || null,
            status: newApiKey.status || 'active',
            createdAt: newApiKey.createdAt || null,
        });
    } catch (error) {
        console.log("Alert! controller/apiController~generateNewApiKey just knocked");
        res.status(500).json({ message: 'Failed to generate API key', error: error.message });
    }
}

async function deleteApiKey(req, res) {

    try {
        const apiKey = await Api.findOne({ userId: req.user.objectId });
        if (!apiKey) {
            return res.status(404).json({ message: 'API key not found' });
        }

        // Delete the API key from the database
        await Api.deleteMany({ userId: req.user.objectId });

        res.status(200).json({ message: 'API key deleted successfully' });
    } catch (error) {
        console.log("Alert! controller/apiController~deleteApiKey just knocked");
        res.status(500).json({ message: 'Failed to delete API key' });
    }

}

module.exports = { generateNewApiKey, getApiKeys, deleteApiKey };
