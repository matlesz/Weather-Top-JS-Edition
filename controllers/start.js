"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const start = {
  index(request, response) {
    const viewData = {
      title: "Start Page",
    };
    response.render("start", viewData);
  }

};

module.exports = start;
