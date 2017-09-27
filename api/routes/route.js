'use strict';
import user from '../controllers/user';

module.exports = function(app) {

  app.route('/user')
    .get(user.get_all_tasks)
};
