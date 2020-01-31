const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const getItems = (params) => {
  return new Promise((resolve, reject) => {
    dynamo.scan(params, (error, data) => {
      if (error)
        reject(error);
      else
        resolve(data);
    })
  });
}

const Create = (params) => {
  return new Promise((resolve, reject) => {
    dynamo.put(params, (error) => {
      if (error)
        reject({ created: false, error });
      else
        resolve({ created: true })
    })
  });
}

const Delete = (params) => {
  return new Promise((resolve, reject) => {
    dynamo.delete(params, (error) => {
      if (error)
        reject({ deleted: false, error });
      else
        resolve({ deleted: true })
    })
  });
}

const Update = (params) => {
  return new Promise((resolve, reject) => {
    dynamo.update(params, (error) => {
      if (error)
        reject({ updated: false, error });
      else
        resolve({ updated: true })
    })
  });
}

module.exports = {
  getItems,
  Create,
  Delete,
  Update
}