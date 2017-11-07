import AuthRoutesMap from '../routes/AuthRoutesMap';
import jwt from  'jsonwebtoken';
import ConfigObj from '../config/'

class Authentication {

    checkIfValidRequest (req, res, next){
        const requestedUrl = req.url.match('^[^?]*')[0] ;
        for(let r of AuthRoutesMap) {
            if (requestedUrl === r.path && r.authRequired) {
                let isValidRequest = this.jsonWebTokenValidation(req);
                isValidRequest ? next(): res.send({message: "Unauthorised request", status: 401});
                break;
            }

            if (requestedUrl === r.path && !r.authRequired) {
                next();
                break;
            }
        }


    };

     jsonWebTokenValidation (req) {
      jwt.sign({ foo: 'bar' }, ConfigObj.secretKey,  function(err, token) {
          console.log(token, "***********************************", err);
      });

        return false;
    }
};


export default  new Authentication();