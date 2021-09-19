"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/stations-store");
const uuid = require("uuid");
const stationsAnalytics = require("../utils/stations-analytics");
const axios = require("axios");

const stations = {
  async index(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    logger.debug("Station id = ", stationId);

    let report = {};
    const latitude = station.latitude;
    const longitude = station.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=1ab878c1802272481590a2f7cf32581d`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.tempTrend = [];
      report.windyTrend = [];
      report.pressTrend = [];
      report.trendLabelsTemp = [];
      report.trendLabelsWind = [];
      report.trendLabelsPress = [];
      const trends = result.data.daily;
      for (let i=0; i<trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const dateTemp = new Date(trends[i].dt * 1001.5);
        report.trendLabelsTemp.push(`${dateTemp.getDate()}/${dateTemp.getMonth()}/${dateTemp.getFullYear()}` );
      }
      for (let i=0; i<trends.length; i++) {
        report.windyTrend.push(trends[i].wind_speed);
        const dateWind = new Date(trends[i].dt * 1001.5);
        report.trendLabelsWind.push(`${dateWind.getDate()}/${dateWind.getMonth()}/${dateWind.getFullYear()}` );
      }
      for (let i=0; i<trends.length; i++) {
        report.pressTrend.push(trends[i].pressure);
        const datePress = new Date(trends[i].dt * 1001.5);
        report.trendLabelsPress.push(`${datePress.getDate()}/${datePress.getMonth()}/${datePress.getFullYear()}` );
      }
    }
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
    console.log(minimumTemperature);
    console.log(latestReading);
    const viewData = {
      name: "Station",
      station: stationsStore.getStation(stationId),
      weatherType: weatherType,
      celsius: celsius,
      fahrenheit: fahrenheit,
      windTemp: windTemp,
      minimumTemperature: minimumTemperature,
      maximumTemperature: maximumTemperature,
      temperatureTrend: temperatureTrend,
      windBeaufort: windBeaufort,
      windDirect: windDirect,
      minimumWind: minimumWind,
      maximumWind: maximumWind,
      windTrend: windTrend,
      pressureHpa: pressureHpa,
      minimumPressure: minimumPressure,
      maximumPressure: maximumPressure,
      pressureTrend: pressureTrend,
      latestReading: latestReading,
      reading: report,
      latitude: latitude,
      longitude: longitude
    };
    response.render("stations", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationsStore.removeReading(stationId, readingId);
    response.redirect("/stations/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection),
      time: new Date()
    };
    logger.debug("New Reading = ", newReading);
    stationsStore.addReading(stationId, newReading);
    response.redirect("/stations/" + stationId);
  },

  async addreport(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    logger.info("rendering new report");
    let report = {};
    const latitude = request.body.latitude;
    const longitude = request.body.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=1ab878c1802272481590a2f7cf32581d`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.tempTrend = [];
      report.windyTrend = [];
      report.pressTrend = [];
      report.trendLabelsTemp = [];
      report.trendLabelsWind = [];
      report.trendLabelsPress = [];
      const trends = result.data.daily;
      for (let i=0; i<trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const dateTemp = new Date(trends[i].dt * 1000);
        report.trendLabelsTemp.push(`${dateTemp.getDate()}/${dateTemp.getMonth()}/${dateTemp.getFullYear()}` );
      }
      for (let i=0; i<trends.length; i++) {
        report.windyTrend.push(trends[i].wind_speed);
        const dateWind = new Date(trends[i].dt * 1001);
        report.trendLabelsWind.push(`${dateWind.getDate()}/${dateWind.getMonth()}/${dateWind.getFullYear()}` );
      }
      for (let i=0; i<trends.length; i++) {
        report.pressTrend.push(trends[i].pressure);
        const datePress = new Date(trends[i].dt * 1001);
        report.trendLabelsPress.push(`${datePress.getDate()}/${datePress.getMonth()}/${datePress.getFullYear()}` );
      }
    }
    console.log(report);
    console.log(stationId);
    const newReading = {
      id: uuid.v1(),
      code: report.code,
      temperature: report.temperature,
      windSpeed: report.windSpeed,
      pressure: report.pressure,
      windDirection: report.windDirection,
      time: new Date()
    };
    logger.debug("New Reading = ", newReading);
    stationsStore.addReading(stationId, newReading);
    response.redirect("/stations/" + stationId);
  }
};

module.exports = stations;
