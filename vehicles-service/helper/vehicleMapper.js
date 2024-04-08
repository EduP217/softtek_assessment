
const KeyMapper = {
    "name": "nombre",
    "model": "modelo",
    "vehicle_class": "clase_vehicle",
    "manufacturer": "fabricante",
    "length": "longitud",
    "cost_in_credits": "costo_en_creditos",
    "crew": "tripulación",
    "passengers": "pasajeros",
    "max_atmosphering_speed": "velocidad_maxima_atmosfera",
    "cargo_capacity": "capacidad_carga",
    "consumables": "consumibles",
    "films": "películas",
    "pilots": "pilotos",
    "url": "url",
    "created": "creado",
    "edited": "editado",
}


module.exports = (swapiVehicle) => {
    const mapped = {};
    for (const key in KeyMapper) {
        mapped[KeyMapper[key]] = swapiVehicle[key];
    }
    return mapped;
};