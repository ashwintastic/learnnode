'use strict';
import mongoose from 'mongoose';
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
}



export default new UserController();


