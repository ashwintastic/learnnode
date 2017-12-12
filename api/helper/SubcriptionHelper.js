import Vehicle from '../model/VehicleModel';
import User from '../model/UserModel';
import Passenger from '../model/Passenger';
import auth from '../utils/authMiddleWare';

class SubcriptionHelper{

    async passenger_subscribes_vehicle(passengerInfo){
        // TODO:: later get token from header sent by front-end
        let response = await auth.validateUserJwt( passengerInfo.token);
        let passenger = await Passenger.findOne({phone: response.user}).lean(); // passengerPhoneNumber = response.user;
        let query = {phone: passenger.phone};
        let alreadySubcribed = passenger.hasOwnProperty('hasSubscribedAvehicle');
        if ( !alreadySubcribed ){
            passenger.hasSubscribedAvehicle = {}
        }
        let key = passengerInfo.subscribed_vehicle._id;
        passenger.hasSubscribedAvehicle[key] =  passengerInfo.subscribed_vehicle;
        return Passenger.update(query, {hasSubscribedAvehicle: passenger.hasSubscribedAvehicle }, {upsert:true}).then( () => {
            let subscribedVehicle = passengerInfo.subscribed_vehicle;
            return {message: `You are subcribed to ${subscribedVehicle.name} number is ${subscribedVehicle.vNumber}`}
        }).catch( (err)=>{
            return {message: `some error occured ${err}`}
        })
    }

}

export default new SubcriptionHelper();
