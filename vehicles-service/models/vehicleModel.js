const uuid = require("uuid");
const AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require('bluebird'));
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "TblVehicles-dev";

class VehicleModel {
  constructor(data) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.modelo = data.modelo;
    this.clase_vehicle = data.clase_vehicle;
    this.fabricante = data.fabricante;
    this.longitud = data.longitud;
    this.costo_en_creditos = data.costo_en_creditos;
    this.tripulación = data.tripulación;
    this.pasajeros = data.pasajeros;
    this.velocidad_maxima_atmosfera = data.velocidad_maxima_atmosfera;
    this.capacidad_carga = data.capacidad_carga;
    this.consumibles = data.consumibles;
    this.películas = data.películas;
    this.pilotos = data.pilotos;
    this.url = data.url;
    this.creado = data.creado;
    this.editado = data.editado;
  }

  static async list() {
    const params = {
      TableName: tableName
    };

    try {
      const data = await dynamodb.scan(params).promise();
      if (!data.Items || data.Items.length === 0) return [];
      return data.Items.map(item => new VehicleModel(item));
    } catch (error) {
      console.error('Unable to list items. Error:', error);
      throw error;
    }
  }

  static async findById(id) {
    const params = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };

    try {
      const data = await dynamodb.get(params).promise();
      if (!data.Item) return null;
      return new VehicleModel(data.Item);
    } catch (error) {
      console.error("Unable to read item. Error:", error);
      throw error;
    }
  }

  async create() {
    this.id = uuid.v1();

    const params = {
      TableName: tableName,
      Item: this,
    };

    try {
      await dynamodb.put(params).promise();
      console.log("Item saved successfully.");
    } catch (error) {
      console.error("Unable to save item. Error:", error);
      throw error;
    }
  }

}

module.exports = VehicleModel;
