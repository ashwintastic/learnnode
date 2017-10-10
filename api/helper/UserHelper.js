import User from '../model/UserModel';
import bcrypt from 'bcrypt';
const saltRounds = 5;
class UserHelper {

  create_user(userinfo){
    var user = new User(userinfo);
    console.log("==================>>>", user)
    bcrypt.hash(userinfo.password, saltRounds, function(err, hash) {
      user.password = hash;
      user.save(function(err, task) {
        if (err)
          return err;
        return user;
      });
    });
  }
}



export default new UserHelper();