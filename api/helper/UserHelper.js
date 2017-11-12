import User from '../model/UserModel';
import bcrypt from 'bcrypt';
const saltRounds = 5;
import mongoose, { Schema } from 'mongoose';
import GlobalHelper from '../utils/globalHelpers';
import FileUploader from '../utils/fileuploader';
import Config from '../config'
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
            return GlobalHelper.arrayToObj(results)
        }).catch((err)=>{
            return {message: "some error occured mongo error", err}
        } )
    }

    async save_driver_image(userInfo){
        let userPhone = 914578634; // TODO:: get user info from token in header
        let user = await User.findOne({phone: userPhone});
        if(user != null) {
            let userImage = userInfo.hasOwnProperty('file') ? userInfo.file : null;
            if (userImage != null) {
                let ifDirCreated = await FileUploader.makeDir(Config.imagePath + 'driversImages', userPhone);

                let response = await FileUploader.saveImage(Config.imagePath+'driversImages/'+userPhone ,userImage);
                console.log("====ifdircreated", ifDirCreated, userImage)
                //user.profileImage =
            }
        }
    }
}



export default new UserHelper();