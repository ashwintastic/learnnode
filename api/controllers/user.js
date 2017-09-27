'use strict';
import mongoose from 'mongoose';
//User = mongoose.model('User');
class User {

  get_all_tasks(req, res){
    console.log("get all user")
    let s = {user: "hey m called"}
    res.json(s)
  }
}

export default new User();


