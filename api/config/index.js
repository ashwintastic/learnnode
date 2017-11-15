import path from 'path';
const appDir = path.dirname(require.main.filename);


const ConfigObj = {
    secureApiEnd: false,
    secretKey: 'chunne chunne',
    imagePath: '/storages/',
    mongoDb: 'mongodb://localhost:27017/myCab'

};

export default ConfigObj;