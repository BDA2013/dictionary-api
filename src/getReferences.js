const sendResponse = require('./common')
const { references } = require('../utils/constants')

const handler = async () => {
    try {
        return sendResponse(200, { references: references })
    } catch (error) {
        return sendResponse(400, { message: 'Error: ' + error })
    }
}
module.exports = { handler }