import Vehicle from '../model/VehicleModel';
import User from '../model/UserModel';
import GlobalHelper from '../utils/globalHelpers'


class VehicleHelper {

    async register_vehicle(vehicleinfo, docsPath){
        let vehicle = new Vehicle(vehicleinfo);
        vehicle.vehicleDocs = JSON.stringify(docsPath.path);;
        return vehicle.save().then(function(v){
            return v
        }).catch(function(e){
            return e
        })
    }

    async get_user_vehicle(userInfo){
        let vehicles = await Vehicle.find({vehicleBelongsTo: userInfo.userId}).lean();
        let vehicleObj = GlobalHelper.arrayToObj(vehicles);
        return vehicleObj;
    }

}



export default new VehicleHelper();