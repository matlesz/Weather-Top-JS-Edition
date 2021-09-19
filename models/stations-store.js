"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const stationsAnalytics = require("../utils/stations-analytics");

const stationsStore = {
  store: new JsonStore("./models/stations-store.json", {
    stationsCollection: []
  }),
  collection: "stationsCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    const latest = new Date();
    const weatherType = stationsAnalytics.getWeatherType(station);
    const celsius = stationsAnalytics.getCelsius(station);
    const fahrenheit = stationsAnalytics.getFahrenheit(station);
    const windTemp = stationsAnalytics.getWindChill(station);
    const minimumTemperature = stationsAnalytics.getMinimumTemperature(station);
    const maximumTemperature = stationsAnalytics.getMaximumTemperature(station);
    const temperatureTrend = stationsAnalytics.getTemperatureTrend(station);
    const windBeaufort = stationsAnalytics.getWindBeaufort(station);
    const windDirect = stationsAnalytics.getWindDirection(station);
    const minimumWind = stationsAnalytics.getMinimumWind(station);
    const maximumWind = stationsAnalytics.getMaximumWind(station);
    const windTrend = stationsAnalytics.getWindTrend(station);
    const pressureHpa = stationsAnalytics.getPressureHpa(station);
    const minimumPressure = stationsAnalytics.getMinimumPressure(station);
    const maximumPressure = stationsAnalytics.getMaximumPressure(station);
    const pressureTrend = stationsAnalytics.getPressureTrend(station);
    const latestReading = stationsAnalytics.getLatestReading(station);


    station.weatherType = weatherType;
    station.celsius = celsius;
    station.fahrenheit = fahrenheit;
    station.windTemp = windTemp;
    station.minimumTemperature = minimumTemperature;
    station.maximumTemperature = maximumTemperature;
    station.temperatureTrend = temperatureTrend;
    station.windBeaufort = windBeaufort;
    station.windDirect = windDirect;
    station.minimumWind = minimumWind;
    station.maximumWind = maximumWind;
    station.windTrend = windTrend;
    station.pressureHpa = pressureHpa;
    station.minimumPressure = minimumPressure;
    station.maximumPressure = maximumPressure;
    station.pressureTrend = pressureTrend;
    station.latestReading = latestReading;
    station.latest = latest;
    this.store.save();
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    const latest = new Date();
    const weatherType = stationsAnalytics.getWeatherType(station);
    const celsius = stationsAnalytics.getCelsius(station);
    const fahrenheit = stationsAnalytics.getFahrenheit(station);
    const windTemp = stationsAnalytics.getWindChill(station);
    const minimumTemperature = stationsAnalytics.getMinimumTemperature(station);
    const maximumTemperature = stationsAnalytics.getMaximumTemperature(station);
    const temperatureTrend = stationsAnalytics.getTemperatureTrend(station);
    const windBeaufort = stationsAnalytics.getWindBeaufort(station);
    const windDirect = stationsAnalytics.getWindDirection(station);
    const minimumWind = stationsAnalytics.getMinimumWind(station);
    const maximumWind = stationsAnalytics.getMaximumWind(station);
    const windTrend = stationsAnalytics.getWindTrend(station);
    const pressureHpa = stationsAnalytics.getPressureHpa(station);
    const minimumPressure = stationsAnalytics.getMinimumPressure(station);
    const maximumPressure = stationsAnalytics.getMaximumPressure(station);
    const pressureTrend = stationsAnalytics.getPressureTrend(station);
    const latestReading = stationsAnalytics.getLatestReading(station);
    station.weatherType = weatherType;
    station.celsius = celsius;
    station.fahrenheit = fahrenheit;
    station.windTemp = windTemp;
    station.minimumTemperature = minimumTemperature;
    station.maximumTemperature = maximumTemperature;
    station.temperatureTrend = temperatureTrend;
    station.windBeaufort = windBeaufort;
    station.windDirect = windDirect;
    station.minimumWind = minimumWind;
    station.maximumWind = maximumWind;
    station.windTrend = windTrend;
    station.pressureHpa = pressureHpa;
    station.minimumPressure = minimumPressure;
    station.maximumPressure = maximumPressure;
    station.pressureTrend = pressureTrend;
    station.latestReading = latestReading;
    station.latest = latest;
    this.store.save();
  },

  getReading(id, readingId) {
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings.filter(reading => reading.id == readingId);
    return readings[0];
  },

  updateReading(reading, updatedReading) {
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.pressure = updatedReading.pressure;
    reading.windDirection = updatedReading.windDirection;
    reading.time = new Date;
    this.store.save();
  },


};

module.exports = stationsStore;
