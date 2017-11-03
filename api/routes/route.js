'use strict';
import user from '../controllers/UserController';

module.exports = function(app) {

  app.route('/user')
    .get( user.get_all_tasks)
    .post( user.create_user)
};
