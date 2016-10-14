'use strict';

const service = require('feathers-mongoose');
const schedule = require('./schedule-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: schedule,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/schedules', service(options));

  // Get our initialize service to that we can bind hooks
  const scheduleService = app.service('/schedules');

  // Set up our before hooks
  scheduleService.before(hooks.before);

  // Set up our after hooks
  scheduleService.after(hooks.after);
};
