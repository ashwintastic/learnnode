import User from '../model/UserModel';
import bcrypt from 'bcrypt';
const saltRounds = 5;
class UserHelper {

    async create_user(userinfo){
        let user = new User(userinfo);
        let hash = await bcrypt.hash(userinfo.password, saltRounds);
        user.password = hash;
        return user.save().then( function(usr){
            return usr;
        })
            .catch(function(e){
                return e
            })

    }

    async get_all_user(){
        let counter = 1;
        let userMap = {};
        return User.find({}).lean().then( function (users){
            users.forEach(function(user) {
                delete user.password;
                userMap[counter] = user;
                counter++;
            });
            return userMap;
        })
    }
}



export default new UserHelper();