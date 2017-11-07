
import UserAuthHelper from '../helper/UserAuthHelper'

class AuthenticationController {

    async userAuthentication(req, res){
        let response = await UserAuthHelper.verify_user(req.body);
        res.send(response)
    }

}

export default new AuthenticationController();


