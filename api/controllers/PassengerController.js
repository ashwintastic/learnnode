
import PassengerHelper from '../helper/PassengerHelper';
import SubcriptionHelper from '../helper/SubcriptionHelper';

class PassengerController {

    async register_passenger(req, res){
        let created_passenger = await PassengerHelper.register_passenger(req);
        res.send(created_passenger)
    }

    async passenger_subscribes_vehicle(req, res){
        var respone =  await SubcriptionHelper.passenger_subscribes_vehicle(req.body);
        res.send(respone)
    }



   /* // using joins mainly for automated report purpose
    async get_users_with__vehicles(req, res){
        var response = await UserHelper.get_users_with__vehicles();
        res.send(response)
    }

    async save_driver_image(req, res){
        let response = await UserHelper.save_driver_image(req);
        res.send(response);
    }*/
}



export default new PassengerController();


