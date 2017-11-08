import User from '../model/UserModel';
import bcrypt from 'bcrypt';
const saltRounds = 5;
import mongoose, { Schema } from 'mongoose';
import GlobalHelper from '../utils/globalHelpers'
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

    async get_users_with__vehicles(){

        return await  mongoose.model('User').aggregate([
            {
                $lookup:
                    {
                        from: "vehicles",
                        localField: "_id",
                        foreignField: "vehicleBelongsTo",
                        as: "users_vehicles"
                    }
            }
        ]).exec().then((results)=>{
            console.log("users_with_vehiclesusers_with_vehicles",GlobalHelper.arrayToObj(results))
            return GlobalHelper.arrayToObj(results)
        })
    }
}



export default new UserHelper();