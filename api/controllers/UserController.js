
import UserHelper from '../helper/UserHelper'

class UserController {

    async get_all_user(req, res){
        let allUsers = await UserHelper.get_all_user();
        res.send(allUsers)
    }

    async create_user(req, res){
        var respone =  await UserHelper.create_user(req.body)
        res.send(respone)
    }

    // using joins mainly for automated report purpose
    async get_users_with__vehicles(req, res){
        var response = await UserHelper.get_users_with__vehicles();
        res.send(response)
    }

    async save_driver_image(req, res){
       // debugger
        let response = await UserHelper.save_driver_image(req)
    }
}



export default new UserController();


