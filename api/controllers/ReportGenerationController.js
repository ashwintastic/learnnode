
import ReportHelper from '../helper/ReportHelper'
class ReportGenerationController {
    async vehicle_passenger_mapping(req, res){
        let report = await ReportHelper.vehicle_passenger_mapping(req.body);
        res.send(report)
        
    }

    async report_chart(){
        let report = await ReportHelper.all_drivers_passenger_subscription()
        res.send(report)
    }


}

export default new ReportGenerationController();