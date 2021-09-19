"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const firstName = loggedInUser.firstName;
    const lastName = loggedInUser.lastName;
    const email = loggedInUser.email;
    const password = loggedInUser.password;
    const viewData = {
      title: "Login or Signup",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    response.render("profile", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("stations", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      id: uuid.v1()
    };
    userstore.addUser(user);

    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const password = userstore.getUserByPassword(request.body.password);
    if (user&&password) {
      response.cookie("stations", user.email);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.stations;
    return userstore.getUserByEmail(userEmail);
  },

  updateFirstName(request, response) {
    const userId = accounts.getCurrentUser(request);
    const updatedFirstName = {
      firstName: request.body.firstName,
    };
    userstore.updateFirstName(userId, updatedFirstName);
    response.redirect("/profile");
  },

  updateLastName(request, response) {
    const userId = accounts.getCurrentUser(request);
    const updatedLastName = {
      lastName: request.body.lastName,
    };
    userstore.updateLastName(userId, updatedLastName);
    response.redirect("/profile");
  },

  updateEmail(request, response) {
    const userId = accounts.getCurrentUser(request);
    const updatedEmail = {
      email: request.body.email,
    };
    logger.debug(`Updating Email ${userId}`);
    userstore.updateEmail(userId, updatedEmail);
    response.redirect("/login");
  },

  updatePassword(request, response) {
    const userId = accounts.getCurrentUser(request);
    const updatedPassword = {
      password: request.body.password,
    };
    logger.debug(`Updating Password ${userId}`);
    userstore.updatePassword(userId, updatedPassword);
    response.redirect("/profile");
  },
};

module.exports = accounts;
