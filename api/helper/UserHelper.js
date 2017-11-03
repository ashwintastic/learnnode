import User from '../model/UserModel';
import bcrypt from 'bcrypt';
const saltRounds = 5;
class UserHelper {

    create_user(userinfo){
        var user = new User(userinfo);
        console.log("==================>>>", user)
        return bcrypt.hash(userinfo.password, saltRounds).then(function(hash, err) {
            user.password = hash;
             return user.save()
             //return us
        })
    }
}



export default new UserHelper();