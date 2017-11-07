
import UserAuthHelper from '../helper/UserAuthHelper';
import authMiddleWare from '../utils/authMiddleWare';

class AuthenticationController {

    async userAuthentication(req, res){
        let response = await UserAuthHelper.verify_user(req.body);
        res.send(response)
    }

    async validateJwt(req, res){
        let isTokenValid = await authMiddleWare.validateUserJwt(req.headers.token);
        res.send({token:req.headers.token, isvalidToken: isTokenValid })
    }

}

export default new AuthenticationController();


