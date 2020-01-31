const TABLE = process.env.TABLE || 'Users';
const { Delete } = require('../services');

module.exports.handler = async (event, context, callback) => {
  try {
    const { id } = event.pathParameters
    const params = {
      TableName: TABLE,
      Key: { id }
    }

    const result = await Delete(params) 

    if(result.deleted){
      const response = {
        statusCode: 200,
        body: JSON.stringify({ params, deleted: true, at: new Date() })
      }

      callback(null, response)
    } else 
      callback(result.error, null)

  } catch (error) {
    callback(error, null)
  }
};
