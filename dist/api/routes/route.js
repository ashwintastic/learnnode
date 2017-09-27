'use strict';

module.exports = function (app) {
  var user = require('../controllers/user');
  // todoList Routes
  app.route('/user').get(user.get_all_tasks).post(user.create_user);
};