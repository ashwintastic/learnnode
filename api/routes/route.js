'use strict';
import user from '../controllers/UserController';
import vehicle from '../controllers/VehicleController';

module.exports = function(app) {

  app.route('/user')
    .get( user.get_all_user)
    .post( user.create_user)

    app.route('/registerDriver')
        .post(vehicle.register_vehicle);


       app.get('/getDriverVehicle', vehicle.get_user_vehicle)
};
