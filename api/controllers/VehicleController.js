
import VehicleHelper from '../helper/VehicleHelper'

class VehicleController {

    async register_vehicle(req, res){
        let response = await VehicleHelper.register_vehicle(req.body);
        res.send(response);
    }

    async get_user_vehicle(req, res){
        let user_vehicle = await VehicleHelper.get_user_vehicle(req.query);
        res.send(user_vehicle);
    }

}



export default new VehicleController();


