import User from '../model/UserModel';
import Vehicle from '../model/VehicleModel';
import Passenger from '../model/Passenger';
import {LIMIT } from '../config';

class ReportHelper {

    vehicle_passenger_mapping(userInfo){
        let ifParams = user.hasOwnProperty('userId') ? user.userId : null;
        ifParams === null ? this.get_report_for_all_drivers(userInfo): this.get_report_for_request_driver(userInfo);
    }

    get_report_for_all_drivers(userInfo){
        let requestedPageNum = userInfo.pageNo;
        if (requestedPageNum == 0){return false;}
        let skipVal = requestedPageNum - 1;
        let limit = LIMIT;
        if (userInfo.hasOwnProperty('limit') && user.limit > 0) {
             limit = user.limit || LIMIT;
        }

        let allDrivers = User.find({}).skip(skipVal).limit(10).then((u)=>{
            console.log("000000000000", u.length)

        })
    }

    get_report_for_request_driver(){

    }
}

export default new ReportHelper();