import user from '../controllers/UserController';
import vehicle from '../controllers/VehicleController';
import auth from '../controllers/AuthenticationController';
import ConfigObj from '../config'
import Authentication from '../utils/authMiddleWare'
module.exports = function(app) {

    if (ConfigObj.secureApiEnd) {
        app.all('*', function (req, res, next) {
            console.log('before all routes');
            Authentication.checkIfValidRequest(req, res, next)
        });
    }

    app.route('/user')
        .get( user.get_all_user)
        .post( user.create_user);

    app.route('/registerDriver')
        .post(vehicle.register_vehicle);

    app.get('/getDriverVehicle', vehicle.get_user_vehicle);

    app.route('/login')
        .post(auth.userAuthentication);

    app.post('/validatoken', auth.validateJwt)
};
