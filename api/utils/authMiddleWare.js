import AuthRoutesMap from '../routes/AuthRoutesMap';

const Authentication = new function(req){

    this.checkIfValidRequest = function(req, res, next){
        const requestedUrl = req.url.match('^[^?]*')[0] ;
        for(let r of AuthRoutesMap) {

            if (requestedUrl === r.path && r.authRequired) {
                let isValidRequest = this.jsonWebTokenValidation();
                isValidRequest ? next(): res.send({message: "Unauthorised request", status: 401});
                break;
            }

            if (requestedUrl === r.path && !r.authRequired) {
                next();
                break;
            }
        }


    };

    this.jsonWebTokenValidation = function () {
        return false;
    }
};


export default Authentication;