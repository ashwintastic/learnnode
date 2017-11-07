
class UserAuthHelperHelper {

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


}



export default new UserAuthHelperHelper();