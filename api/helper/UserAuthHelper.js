import User from '../model/UserModel';
import bcrypt from 'bcrypt';
import Authentication from '../utils/authMiddleWare'
class UserAuthHelperHelper {

    async verify_user(userinfo) {
        let user = await User.findOne({phone: userinfo.phone});
        if (user == null) { // user does not exist
            return {isvalid: false, message: "User doesn't exist"}
        }
        else { // user exist
            let response =  await this.validatePassword(userinfo, user);
            return response
        }

    }

    async validatePassword(userinfo, user) {
        return bcrypt.compare(userinfo.password, user.password)
            .then((isValidPass)=>{
               let afterValidationRes =  isValidPass ?  Authentication.generateUserJwt(user) : {isValidpass: false}
                return afterValidationRes

            }).catch((err)=>{
                return {success: false, message: err}
            });
    }
}

export default new UserAuthHelperHelper();