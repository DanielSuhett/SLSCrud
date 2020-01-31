const TABLE = process.env.TABLE || 'Users';
const { getItems } = require('../services');

module.exports.all = async (event, context, callback) => {
    try {
        const params = {
            TableName: TABLE,
        }

        const data = await getItems(params);
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        }

        callback(null, response)

    } catch (error){
        callback(error, null)
    } 
};


module.exports.one = async (event, context, callback) => {
    try {
        const { name } = event.pathParameters

        const params = {
            TableName: TABLE,
            FilterExpression: "#n = :n",
            ExpressionAttributeNames: {
                "#n": "name"
            },
            ExpressionAttributeValues: {
                ":n": name
            }
        }

        const data = await getItems(params);

        if(data.Items.length){
            const response = {
                statusCode: 200,
                body: JSON.stringify(data.Items[0])
            }

            callback(null, response)
        } else {
            const response = {
                statusCode: 404,
                body: JSON.stringify({ error: "Not found name" })
            }

            callback(null, response)
        }

    } catch (error){
        callback(error, null)
    } 
};

