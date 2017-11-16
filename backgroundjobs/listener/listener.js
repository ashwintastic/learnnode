/*
* npm install --save babel-cli babel-preset-node6
and then

./node_modules/babel-cli/bin/babel-node.js --presets node6 ./your_script.js
If you dont want to type --presets node6 you can save it .babelrc file by:

{
  "presets": [
    "node6"
  ]
}

* */


import {SEND_VERIFICATION_MAIL} from '../jobs/constants';
import MongoOplog from 'mongo-oplog';
import QueueGenerator from '../queue/queue';

const oplog = MongoOplog('mongodb://127.0.0.1:27017/local')

oplog.tail();

/*oplog.on('op', data => {
    console.log("listening to insert event on users collections--- op");
    console.log(data);
});*/ /*executed on all operations*/

oplog.on('insert', doc => {
    console.log("listening to event on users collections --insert");
    QueueGenerator.listenToOplogListener(doc, SEND_VERIFICATION_MAIL);
});

oplog.on('update', doc => {
    console.log("listening to event on users collections --update");
    console.log(doc);
});

oplog.on('delete', doc => {
    console.log("listening to event on users collections --delete");
    console.log(doc.o._id);
});

oplog.on('error', error => {
    console.log("listening to event on users collections --error");
    console.log(error);
});

oplog.on('end', () => {
    console.log("listening to event on users collections --end");
    console.log('Stream ended');
});

oplog.stop(() => {
    console.log('listener is live');
});
