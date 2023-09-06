const sendResponse = require('./common')
const { dictionaries } = require('../utils/constants')

const handler = async () => {
    try {
        return sendResponse(200, { dictionaries: dictionaries })
    } catch (error) {
        return sendResponse(400, { message: 'Error: ' + error })
    }
}
module.exports = { handler }