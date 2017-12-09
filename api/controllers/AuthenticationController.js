
import UserAuthHelper from '../helper/UserAuthHelper';
import authMiddleWare from '../utils/authMiddleWare';
import PassengerHelper from '../helper/PassengerHelper';

class AuthenticationController {

    async userAuthentication(req, res){
        let response = await UserAuthHelper.verify_user(req.body);
        res.send(response)
    }

    async passengerLogin(req, res){
        let response = await PassengerHelper.verify_passenger(req.body);
        res.send(response)
    }

    async validateJwt(req, res){
        let isTokenValid = await authMiddleWare.validateUserJwt(req.headers.token);
        res.send({token:req.headers.token, isvalidToken: isTokenValid })
    }

}

export default new AuthenticationController();


