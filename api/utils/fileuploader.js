import mkdirp from 'mkdirp';
import GlobalConfig from '../config';
const fs = require('fs');
const Promise = require('bluebird');

class FileUploader {

    async saveFileToDes(path , file, storeInternal = true){
        if (storeInternal) {
            let filename = this.giveAnameToFile();
            return new Promise((resolve, reject) => {
                fs.writeFile(GlobalConfig.imagePath + `${path}/${filename}`, file.buffer, 'binary', function (err) {
                    if (err) reject(false);
                    else resolve(true)
                })
            })
        }
    }

    async saveAllFiles(path , files){
        let promises = [];
        const allImages = files.length;

        for(let i=0; i< allImages; i++){
            promises.push(this.saveFileToDes(path,files[i]));
        }
        Promise.all(promises)
            .then(() => {
                return true
            })
            .catch((e) => {
                return false
            });
    }

    async makeDir(parentDir) {
        mkdirp(GlobalConfig.imagePath+parentDir.then((dir)=>{
            return {response: true, message: dir}
        })).catch( (err) =>{
            return {response: false, reason: err}
        });
    }

    giveAnameToFile(){
        return Date.now();
    }

}

export default new FileUploader();