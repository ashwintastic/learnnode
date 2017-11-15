import MongoOplog from 'mongo-oplog';
import GlobalConfig from '../config'
const oplog = MongoOplog(GlobalConfig.mongoDb, { ns: 'test.posts' })

oplog.tail();

oplog.on('op', data => {
    console.log(data);
});

oplog.on('insert', doc => {
    console.log(doc);
});

oplog.on('update', doc => {
    console.log(doc);
});

oplog.on('delete', doc => {
    console.log(doc.o._id);
});

oplog.on('error', error => {
    console.log(error);
});

oplog.on('end', () => {
    console.log('Stream ended');
});

oplog.stop(() => {
    console.log('server stopped');
});