import AuthRoutesMap from '../routes/AuthRoutesMap';
import jwt from  'jsonwebtoken';
import ConfigObj from '../config/'

class Authentication {

   async checkIfValidRequest (req, res, next){
        const requestedUrl = req.url.match('^[^?]*')[0] ;
        for(let r of AuthRoutesMap) {
            if (requestedUrl === r.path && r.authRequired) {
                let isValidRequest = await this.validateUserJwt(req);
                isValidRequest ? next(): res.send({message: "Unauthorised request", status: 401});
                break;
            }

            if (requestedUrl === r.path && !r.authRequired) {
                next();
                break;
            }
        }


    };

    async validateUserJwt(info){
        // TODO :: token = req.headres['token']
        // as of now postman doesn't allow token header to be send so
        //  i'm using hardcoded generated access-token
        let token = info ; //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo5MTQ1Nzg2MzMsImlhdCI6MTUxMjgxNDc1MX0.JF_7V0BoV1xioLlIRZ-CD4onlvlLmNUxhGwSwDZzK5w";
        try {
            var decoded = await jwt.verify(token, ConfigObj.secretKey);
            return decoded
        } catch(err) {
            console.log("---------------------token ", err)
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