import Vehicle from '../model/VehicleModel';
import User from '../model/UserModel';
import Passenger from '../model/Passenger';
import auth from '../utils/authMiddleWare';

class SubcriptionHelper{

    async passenger_subscribes_vehicle(passengerInfo){
        // TODO:: later get token from header sent by front-end
        let response = await auth.validateUserJwt( passengerInfo.token);
        let passenger = await Passenger.findOne({phone: response.user}); // passengerPhoneNumber = response.user;
        passenger.hasSubscribedAvehicle.push(passengerInfo.subscribed_vehicle);
        return passenger.save().then( (passenger) => {
            let subscribedVehicle = passenger.hasSubscribedAvehicle.pop()
            return {message: `You are subcribed to ${subscribedVehicle.name} number is ${subscribedVehicle.vNumber}`}
        }).catch( (err)=>{
            return {message: `some error occured ${err}`}
        })


    }

}

export default new SubcriptionHelper();