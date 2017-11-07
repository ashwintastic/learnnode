import mongoose from 'mongoose';
import User from '../model/UserModel';
import UserHelper from '../helper/UserHelper'
import UserAuthHelper from '../helper/UserAuthHelper'

class AuthenticationController {

    async userAuthentication(req, res){
        let allUsers = await UserAuthHelper.get_all_user();
        res.send(allUsers)
    }

}



export default new AuthenticationController();


