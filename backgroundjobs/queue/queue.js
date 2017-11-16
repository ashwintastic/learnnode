import kue from 'kue';
const queue = kue.createQueue();
import Scheduler from '../scheduler/scheduler'
class QueueGenerator {

    listenToOplogListener(insertedDoc, jobToprocess){
        console.log("----in queuegenerator-------", insertedDoc);
        this.createnewQueue(insertedDoc, jobToprocess)
    }

    /* creates a new newQueue and pushed a new job named sendVerification and save it */
    createnewQueue (data, jobToprocess){
        let job = queue.create(jobToprocess, data);
        job.save();
        Scheduler.processJobs(job);
    }
}

export default new QueueGenerator();