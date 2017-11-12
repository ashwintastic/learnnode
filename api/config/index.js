import path from 'path';
const appDir = path.dirname(require.main.filename);


const ConfigObj = {
    secureApiEnd: false,
    secretKey: 'chunne chunne',
    imagePath: appDir+'/storages/'

};

export default ConfigObj;