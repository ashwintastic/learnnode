import storage from '../utils/fileuploader'
import VehicleHelper from '../helper/VehicleHelper'
class VehicleController {

    async register_vehicle(req, res){
        try {
            let allFiles = req.files;
            let isFileSaved = await storage.saveAllFiles('vehicleDoc', allFiles, req.body);
            if(isFileSaved.message) {
                console.log("allfiles", isFileSaved)
                let response = await VehicleHelper.register_vehicle(req.body, isFileSaved);
                res.send(response);
            }

        }catch(err){
            return false
        }
    }

    async get_user_vehicle(req, res){
        let user_vehicle = await VehicleHelper.get_user_vehicle(req.query);
        res.send(user_vehicle);
    }

}


export default new VehicleController();


