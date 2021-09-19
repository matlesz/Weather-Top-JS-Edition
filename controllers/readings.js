"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/stations-store");

const readings = {
  index(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      name: "Edit Reading",
      station: stationsStore.getStation(stationId),
      reading: stationsStore.getReading(stationId, readingId)
    };
    response.render("readings", viewData);
  },

  update(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const reading = stationsStore.getReading(stationId, readingId)
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection),
      time: new Date()
    };
    logger.debug(`Updating Reading ${readingId} from Station ${stationId}`);
    stationsStore.updateReading(reading, newReading);
    response.redirect("/stations/" + stationId);
  }
};

module.exports = readings;
