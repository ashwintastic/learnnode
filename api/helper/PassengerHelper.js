import Passenger from '../model/Passenger'
import bcrypt from 'bcrypt';
import GlobalConfig from '../config';
import Authentication from '../utils/authMiddleWare'

class PassengerHelper {

    async register_passenger(req){
        let passengerInfo = req.body;
        let passenger = new Passenger(passengerInfo);
        let hash = await bcrypt.hash(passengerInfo.password, GlobalConfig.saltRounds);
        passenger.password = hash;
        return passenger.save().then( function(passenger){
            return passenger;
        }).catch(function(e){
                return e
            })
    }

    async verify_passenger(passengerInfo){
        let passenger = await Passenger.findOne({phone: passengerInfo.phone});
        console.log("after passenger fetch", passenger)
        if (passenger == null) { // passenger does not exist
            return {isvalid: false, message: "User doesn't exist"}
        }
        else { // user exist
            let response =  await this.validatePassword(passengerInfo, passenger);
            return response
        }
    }


   async validatePassword(pessengerInfo, passenger) {
        return bcrypt.compare(pessengerInfo.password, passenger.password)
            .then((isValidPass)=>{
                let afterValidationRes =  isValidPass ?  Authentication.generateUserJwt(passenger) : {isValidpass: false}
                return afterValidationRes

            }).catch((err)=>{
                return {success: false, message: err}
            });
    }

}
export default new PassengerHelper ();