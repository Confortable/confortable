'use strict';

// schedule-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const scheduleModel = mongoose.model('schedule', scheduleSchema);

module.exports = scheduleModel;