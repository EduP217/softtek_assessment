'use strict';

const axios = require('axios');
const VehicleModel = require('../models/vehicleModel');
const VehicleMapper = require('../helper/vehicleMapper');


module.exports.list = (event, context, callback) => {
  const queryParams = event.queryStringParameters;
  if (queryParams && queryParams.swapiFlag && queryParams.swapiFlag.toLowerCase() === "true") {
    console.debug("List all vehicles from Swapi.");
    return axios.get("https://swapi.py4e.com/api/vehicles")
     .then(res => {
        console.debug(res.data);
        let results = res.data.results.map(i => VehicleMapper(i));
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(results)
        });
      })
     .catch(err => {
        console.error(err);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            message: `Unable to list vehicles from Swapi: ${err.message}`
          })
        })
      });
  }

  console.debug("List all vehicles from database.");
  return VehicleModel.list()
    .then(res => {
      console.debug(res);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch(err => {
      console.error(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to list vehicles from database: ${err.message}`
        })
      })
    });
};

module.exports.find = (event, context, callback) => {
  console.debug("Find a vehicle from database.");
  const { id } = event.pathParameters;

  return VehicleModel.findById(id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch(err => {
      console.error(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to get vehicle from database: ${err.message}`
        })
      })
    });
};

module.exports.create = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  return new VehicleModel(requestBody).create()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Vehicle sucessfully created.`
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to create the vehicle: ${err.message}`
        })
      });
    });
};
