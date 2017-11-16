import mkdirp from 'mkdirp';
import GlobalConfig from '../config';
const fs = require('fs');
const Promise = require('bluebird');

class FileUploader {

    async saveFileToDes(fileTosaveDir , file, iCount, storeInternal = true){
        if (storeInternal) {
            this.saveImage(fileTosaveDir, file, iCount);
        }
    }

    async saveImage(fileTosaveDir,file, iCount=false){
        let imgName = Date.now();
        let filename = file instanceof Array ? this.giveAnameToFile(iCount) : imgName;
        return new Promise((resolve, reject) => {
            fs.writeFile(`${fileTosaveDir}/${filename}`, file.buffer, 'binary',  function (err) {
                if (err) reject(false);
                else resolve({message: true, imgName:imgName})
            })
        })
    }

    async saveAllFiles(path , files){
        let promises = [];
        const allImages = files.length;
        // check Or make directory exist
        //let userId = req.header('token')
        let dirStatus = await this.makeDir(GlobalConfig.imagePath+path,  '9145780834');
        let fileTosaveDir = GlobalConfig.imagePath+path + '/'+ '9145780834';
        if (dirStatus) {
            for (let i = 0; i < allImages; i++) {
                promises.push(this.saveFileToDes(fileTosaveDir, files[i], i));
            }
            Promise.all(promises)
                .then(() => {
                    return true
                })
                .catch((e) => {
                    return false
                });
        }
        else{
            return{message: "Error with directory creation"}
        }
    }

    async makeDir(parentDirTree, newDir) {
        parentDirTree = parentDirTree + '/';
        return new Promise((resolve, reject) => {
            mkdirp(`${parentDirTree+newDir}`, function (err) {
                if (err) {
                    console.error(err);
                    reject(false)
                }
                else {
                    console.log('directory created !!!!');
                    resolve(true)
                }
            })
        })
    }

    giveAnameToFile(c){
        return c;
    }

}

export default new FileUploader();