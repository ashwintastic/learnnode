import {SEND_VERIFICATION_MAIL} from '../jobs/constants';
import {SEND_VERIFICATION_MAIL_JOB} from '../jobs/sendVerificationMail'
class Scheduler {

    processJobs(queueToProcess){
        console.log('this queue has been processed================',queueToProcess.type)
        switch(queueToProcess.type) {
            case SEND_VERIFICATION_MAIL:
                eval(SEND_VERIFICATION_MAIL_JOB);
                break;
            default:
                console.log("default job executed in schedule.js")
        }
    }
}

export default new Scheduler();