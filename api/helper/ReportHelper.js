import User from '../model/UserModel';
import Vehicle from '../model/VehicleModel';
import Passenger from '../model/Passenger';
import {LIMIT } from '../../config'; //5

class ReportHelper {

    async vehicle_passenger_mapping(userInfo){
        let ifParams = userInfo.hasOwnProperty('userId') ? userInfo.userId : null;
        if (ifParams === null){
            let response = await this.get_report_for_all_drivers(userInfo);
            return response;
        }
        else{
            let response = await this.get_report_for_requested_driver(userInfo)
            return response;
        }
    }

      get_report_for_all_drivers(userInfo){
        let requestedPageNum = userInfo.pageNo;
        if (requestedPageNum == 0){return false;}
        let limit = LIMIT;
          let skipVal = (requestedPageNum - 1)*limit;
        if (userInfo.hasOwnProperty('limit') && userInfo.limit > LIMIT ) {
             limit = userInfo.limit;
        }
          let query = User.find({}).select('firstName + lastName + email + phone');

           return query.exec().then ( (u) => {
               let count = u.length;
               let pages = Math.ceil(count/limit);
               let result = u.slice(skipVal, skipVal+limit);
               return ({message: true, count, result,pages})
           }).catch( (err)=>{
               return {messgae: false, error}
           })
    }

    get_report_for_requested_driver(){

    }
}

export default new ReportHelper();