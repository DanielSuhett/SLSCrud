const uuid = require('uuid');
const TABLE = process.env.TABLE || 'Users';
const { Create } = require('../services');

module.exports.handler = async (event, context, callback) => {
  try {
    const id = uuid.v4();
    const { name } = JSON.parse(event.body);

    const params = {
      TableName: TABLE,
      Item: {
        id,
        name
      }
    }

    const result = await Create(params) 

    if(result.created){
      const response = {
        statusCode: 200,
        body: JSON.stringify({ params, created: true, at: new Date() })
      }

      callback(null, response)
    } else 
      callback(result.error, null)

  } catch (error) {
    callback(error, null)
  }
};
