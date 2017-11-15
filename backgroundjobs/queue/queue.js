var kue = require('kue');
const queue = kue.createQueue();
import Scheduler from '../scheduler/scheduler'
class QueueGenerator {

    listenToOplogListener(insertedDoc){
        console.log("----------------in queuegenerator", insertedDoc);
        this.createnewQueue(insertedDoc)
    }

    /* creates a new newQueue and pushed a new job named sendVerification and save it */
    createnewQueue (doc){
        let newQueue = queue.create('sendVerification');
        newQueue.save();
        Scheduler.processJobs(newQueue);
    }
}

export default new QueueGenerator();