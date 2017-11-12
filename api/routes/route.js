import user from '../controllers/UserController';
import vehicle from '../controllers/VehicleController';
import auth from '../controllers/AuthenticationController';
import ConfigObj from '../config'
import Authentication from '../utils/authMiddleWare';
var multer  = require('multer')
var upload = multer();



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

    app.post('/registerDriver', upload.any() ,vehicle.register_vehicle);

    app.get('/getDriverVehicle', vehicle.get_user_vehicle);

    app.route('/login')
        .post(auth.userAuthentication);

    app.post('/validatoken', auth.validateJwt)

    app.get('/all_users_vehicles', user.get_users_with__vehicles);

    app.post('/save_user_image', upload.single('userImg') , user.save_driver_image)
};
