import AuthRoutesMap from '../routes/AuthRoutesMap';
import jwt from  'jsonwebtoken';
import ConfigObj from '../config/'

class Authentication {

    checkIfValidRequest (req, res, next){
        const requestedUrl = req.url.match('^[^?]*')[0] ;
        for(let r of AuthRoutesMap) {
            if (requestedUrl === r.path && r.authRequired) {
                let isValidRequest = this.validateUserJwt(req);
                isValidRequest ? next(): res.send({message: "Unauthorised request", status: 401});
                break;
            }

            if (requestedUrl === r.path && !r.authRequired) {
                next();
                break;
            }
        }


    };

    async validateUserJwt(token){
        try {
            var decoded = await jwt.verify(token, ConfigObj.secretKey);
            return decoded
        } catch(err) {
            return false
        }

    }

    async generateUserJwt (userinfo) {
        // TODO:: add catch here
        let token = await jwt.sign({ user: userinfo.phone}, ConfigObj.secretKey);
        return {token: token, isValidpass: true}

    }
};


export default  new Authentication();