'use strict';
import mongoose from 'mongoose';
import User from '../model/UserModel';
import UserHelper from '../helper/UserHelper'
class UserController {

  get_all_tasks(req, res){
    console.log("get all user");
    let s = {user: "hey m called.."}
  }

  create_user(req, res){
    var respone = UserHelper.create_user(req.body);
    console.log("in controller ", respone)
  }
}



export default new UserController();


