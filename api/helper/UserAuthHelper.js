import User from '../model/UserModel';

class UserAuthHelperHelper {

    async verify_user(userinfo){
        let password = userinfo.password;
        let isValidUser = await User.findOne({phone:userinfo.phone});
        if(isValidUser == null){ // user does not exist
            return false
        }
        else { // user exist
            console.log("oooooooooooooooooooooo", isValidUser)
        }

    }


}



export default new UserAuthHelperHelper();