const TABLE = process.env.TABLE || 'Users';
const { Update } = require('../services');

module.exports.handler = async (event, context, callback) => {
  try {
    const { $id } = event.pathParameters;
    const { name } = JSON.parse(event.body);

    const params = {
      TableName: TABLE,
      Key: { $id },
      UpdateExpression: "set #n = :new_name",
      ExpressionAttributeNames: {
        "#n": "name",
      },
      ExpressionAttributeValues: {
        ":new_name": name
      },
    };

    const result = await Update(params) 

    if(result.updated){
      const response = {
        statusCode: 200,
        body: JSON.stringify({ params, updated: true, at: new Date() })
      }

      callback(null, response)
    } else 
      callback(result.error, null)

  } catch (error) {
    callback(error, null)
  }
};
