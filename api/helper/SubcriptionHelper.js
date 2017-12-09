import Vehicle from '../model/VehicleModel';
import User from '../model/UserModel';
import Passenger from '../model/Passenger';
import auth from '../utils/authMiddleWare';

class SubcriptionHelper{

    async passenger_subscribes_vehicle(passengerInfo){
        // TODO:: later get token from header sent by front-end
        let response = await auth.validateUserJwt( passengerInfo.token);
        let passenger = await Passenger.findOne({phone: response.user}); // passengerPhoneNumber = response.user;
        console.log("================after passenger token", passenger)
        passenger.hasSubscribedAvehicle.push(passengerInfo.subscribed_vehicle);
        return passenger.save().then( (passenger) => {
            console.log("saved--------------------")
            let subscribedVehicle = passenger.hasSubscribedAvehicle.pop()
            return {message: `You are subcribed to ${subscribedVehicle.name}`}
        }).catch( (err)=>{
            console.log("------------------", err);
        })


    }

}

export default new SubcriptionHelper();