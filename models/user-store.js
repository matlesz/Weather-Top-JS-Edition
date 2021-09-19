"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const userStore = {
  store: new JsonStore("./models/user-store.json", { users: [] }),
  collection: "users",

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  getUserByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },

  updateFirstName(userId, updatedFirstName) {
    userId.firstName = updatedFirstName.firstName;
    this.store.save();
  },

  updateLastName(userId, updatedLastName) {
    userId.lastName = updatedLastName.lastName;
    this.store.save();
  },

  updateEmail(userId, updatedEmail) {
    userId.email = updatedEmail.email;
    this.store.save();
  },

  updatePassword(userId, updatedPassword) {
    userId.password = updatedPassword.password;
    this.store.save();
  },
};

module.exports = userStore;
