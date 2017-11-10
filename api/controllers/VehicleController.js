import storage from '../utils/fileuploader'
import VehicleHelper from '../helper/VehicleHelper'
class VehicleController {

    async register_vehicle(req, res){
        try {
            console.log("---isisisisisisisi---------------------1b",)
            let isFileSaved = await storage.saveFileToDes(req.files[0]);
            console.log("---isisisisisisisi---------------------1ba",)
            let response = await VehicleHelper.register_vehicle(req.body);
            console.log("afetr await", response)
            res.send(response);
        }catch(err){
            console.log("---isisisisisisisi---------------------2",);
            res.send({"message": "some error occured"});
            //return false
        }
    }

    async get_user_vehicle(req, res){
        let user_vehicle = await VehicleHelper.get_user_vehicle(req.query);
        res.send(user_vehicle);
    }

}


export default new VehicleController();


